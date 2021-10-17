(() => {
    const synth = new Tone.AMSynth().toDestination();


    function getElements() {
        buttons.map(({ color }) => HTMLpadButtons[color] = document.getElementById(color))

        HTMLpad = document.querySelectorAll('.pad')
        HTMLstartButton = document.getElementById('start')
        HTMLmessage = document.getElementById('message')
        HTMLlevelStatus = document.getElementById('level')
        HTMLscoreStatus = document.getElementById('score')
    };

    function assignEvents() {
        buttons.map(({ color }, index) => HTMLpadButtons[color].onmousedown = () => clickDown(index))
        buttons.map(({ color }, index) => HTMLpadButtons[color].onmouseup = (e) => clickLeave(index))
        HTMLstartButton.onclick = () => switchStartCancelGame();
    };


    //
    // Event functions
    //

    // When the user click down
    async function clickDown(index) {
        if (!isClickAllowed) return
        clickedOrder.push(index)
        colorTurnOn(index)
    }

    // When the user leaves mouse button
    function clickLeave(index) {
        if (!isClickAllowed) return
        colorTurnOff(index)
        if (clickedOrder[clickCount] != order[clickCount]) {
            gameOver()
            return
        }
        score += difficulty + 1
        renderStatus()
        if (clickedOrder.length == order.length) {
            if (turn < MAX_TONES_BY_LEVEL) nextTurn();
            else nextLevel()
        }
        clickCount++
    }

    function switchStartCancelGame() {
        if (onGame) {
            HTMLstartButton.textContent = 'Iniciar'
            synth.triggerRelease()
            stopGame('Clique em Iniciar')
        }
        else {
            HTMLstartButton.textContent = 'Cancelar'
            playGame()
        }
    }


    //
    // Game functions
    //

    // Create the shuffled colors array
    async function addNewShuffledColor() {
        const randomic = Math.floor(Math.random() * 4);
        order.push(randomic);
        disallowClick();
        for (let index of order) {
            await scheduleOnOffColors(index, difficulty);
        }
        allowClick()
    }

    // Schedule the switching on and off of the raffled colors
    function scheduleOnOffColors(index, velocity) {
        const { timeToTurnOff, timeToResolve } = levelTimes[velocity]
        return new Promise((resolve) => {
            if (onGame) colorTurnOn(index)
            setTimeout(() => {
                if (onGame) colorTurnOff(index)
            }, timeToTurnOff);
            setTimeout(() => {
                resolve()
            }, timeToResolve)
        })
    }

    // Increment turn, adding another shuffled color
    let nextTurn = () => {
        setTimeout(() => {
            clickCount = 0
            turn++;
            clickedOrder = [];
            addNewShuffledColor();
        }, 500)
    }

    async function nextLevel() {
        if (difficulty == 8) {
            userWins()
            return
        }
        order = [];
        clickedOrder = [];
        turn = 0;
        clickCount = 0;
        isClickAllowed = false;
        difficulty++;
        renderStatus()
        await manageMessage(`Iniciando nível ${difficulty + 1}`)
        nextTurn()
    }

    async function userWins() {
        showMessage('Parabéns !!!!')
        await playWinMusic()
        showMessage('Você venceu!! Clique em Iniciar para recomeçar')
    }

    async function gameOver() {
        disallowClick();
        HTMLstartButton.textContent = 'Iniciar';
        const now = Tone.now();
        gameOverMusic.forEach((note, index) => {
            synth.triggerAttackRelease(note, '8n', now + (index / 20))
        })
        stopGame('Que pena! Você perdeu! Clique em Iniciar para recomeçar')
    }

    // Start a new Game
    async function playGame() {
        renderStatus()
        onGame = true
        order = [];
        clickedOrder = [];
        turn = 0;
        await manageMessage('Iniciando jogo')
        nextTurn();
    }

    function stopGame(text) {
        order = [];
        clickedOrder = [];
        turn = 0;
        clickCount = 0;
        isClickAllowed = false;
        difficulty = 0;
        onGame = false;
        score = 0;
        showMessage(text)
        renderStatus();
    }


    //
    // Effect functions
    //

    function colorTurnOn(index) {
        const { color, note } = buttons[index]
        const element = HTMLpadButtons[color];
        element.classList.add('selected');
        synth.triggerAttack(note)
    }

    function colorTurnOff(index) {
        const { color } = buttons[index]
        const element = HTMLpadButtons[color];
        element.classList.remove('selected');
        synth.triggerRelease()
    }

    function allowClick() {
        isClickAllowed = true;
        Array.from(HTMLpad).map(elem => elem.classList.add('allowed-click-pad'))
    }

    function disallowClick() {
        isClickAllowed = false;
        Array.from(HTMLpad).map(elem => elem.classList.remove('allowed-click-pad'))
    }

    async function playWinMusic() {
        return new Promise(async (resolve) => {

            for (let index of winMusic) {
                await scheduleOnOffColors(index, 7);
            }
            for (let index of winMusic) {
                await scheduleOnOffColors(index, 7);
            }
            for (let index of winMusic) {
                await scheduleOnOffColors(index, 7);
            }
            resolve()
        })
    }

    function manageMessage(text) {
        return new Promise((resolve) => {
            showMessage(text)
            setTimeout(() => {
                clearMessage()
            }, 2000)
            setTimeout(() => {
                resolve()
            }, 2500)
        })
    }

    function showMessage(text) {
        Array.from(HTMLpad).map(elem => elem.classList.add('selected'))
        HTMLmessage.innerText = text
        HTMLmessage.style.zIndex = 2
    }

    function clearMessage() {
        Array.from(HTMLpad).map(elem => elem.classList.remove('selected'))
        HTMLmessage.innerText = ''
        HTMLmessage.style.zIndex = 0
    }

    function renderStatus() {
        HTMLlevelStatus.textContent = `Nível: ${difficulty + 1}`
        HTMLscoreStatus.textContent = `Pontos: ${score}`
    }

    start()
})();

