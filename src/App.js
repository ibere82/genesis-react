import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'
import './App.css';
import Pad from './components/Pad';
import buttons from './data/buttons.json'
import levelTimes from './data/levelTimes.json'
//import winMusic from './data/winMusic.json'
import gameOverMusic from './data/gameOverMusic.json'
//import PadClass from './api/PadClass';

const MAX_TONES_BY_LEVEL = 2;
const synth = new Tone.AMSynth().toDestination();

function App() {
  const [shuffledOrder, setShuffledOrder] = useState([]);
  const [turn, setTurn] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isClickAllowed, setIsClickAllowed] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('')
  const refMessage = useRef()
  const { current } = useRef({ onGame: false })
  const { onGame } = current

  useEffect(() => {
    setMessage('Clique em Iniciar')
  }, [])

  useEffect(async () => {
    if (onGame) {
      await manageEphemeralMessage(`Iniciando nível ${difficulty}`, 0, 5, 10)
      setShuffledOrder([]);
      setTurn(1);
    }
  }, [difficulty])

  useEffect(() => {
    if (onGame) {
      setClickCount(0)
      setTimeout(() => {
        addNewShuffledColor();
      }, 500)
    }
  }, [turn])

  useEffect(async () => {
    setIsClickAllowed(false)
    for (let color of shuffledOrder) {
      if (current.onGame) await scheduleOnOffPads(color, difficulty - 1);
    }
    setIsClickAllowed(true)
  }, [shuffledOrder])

  useEffect(() => {
    setIsClickAllowed(message === '')
    refMessage.current.innerText = message
  }, [message])

  const startNewGame = () => {
    console.log('start')
    setScore(0);
    setDifficulty(1);
    current.onGame = true
  }

  const stopGame = () => {
    synth.triggerRelease()
    setDifficulty(0)
    setTurn(0)
    current.onGame = false
  }

  const gameOver = async () => {
    return new Promise(() => {
      setIsClickAllowed(false)
      setMessage('Que pena! Você perdeu! Clique em Iniciar para recomeçar')
      const now = Tone.now();
      gameOverMusic.forEach((note, index) =>
        synth.triggerAttackRelease(note, '8n', now + (index / 20)))
    })
  }

  const addNewShuffledColor = async () => {
    const randomic = Math.floor(Math.random() * 4);
    setShuffledOrder([...shuffledOrder, buttons[randomic].color]);
  }

  // Schedule the switching on and off of the raffled colors
  const scheduleOnOffPads = (color, velocity) => {
    const { timeToTurnOff, timeToResolve } = levelTimes[velocity]
    const { ref } = buttons.find(button => button.color === color)

    return new Promise((resolve) => {
      setTimeout(() => {
        ref.turnOn()
      }, 10)
      setTimeout(() => {
        ref.turnOff()
      }, timeToTurnOff);
      setTimeout(() => {
        resolve()
      }, timeToResolve)
    })

  }

  const userWins = async () => {
    setMessage('Parabéns !!!!')
    //await playWinMusic()
    setMessage('Você venceu!! Clique em Iniciar para recomeçar')
  }


  const handleClick = async (color) => {
    if (shuffledOrder[clickCount] !== color) {
      await gameOver()
      stopGame()
    }
    else {
      setScore(score + difficulty)
      const newClickCount = clickCount + 1
      if (newClickCount === shuffledOrder.length) {
        if (turn < MAX_TONES_BY_LEVEL) setTurn(turn + 1)
        else {
          const newLevel = difficulty + 1
          if (newLevel > levelTimes.length) userWins()
          else setDifficulty(difficulty + 1)
        }
      }
      setClickCount(newClickCount)
    }
  }

  const manageEphemeralMessage = (text, timeBefore = 0, timeDuring = 2000, timeAfter = 2500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessage(text)
      }, timeBefore)
      setTimeout(() => {
        setMessage('')
      }, timeDuring)
      setTimeout(() => {
        resolve()
      }, timeAfter)
    })
  }

  return (
    <>
      <main>
        <div>
          <button id="start" onClick={onGame ? stopGame : startNewGame} >{onGame ? 'Cancelar' : 'Iniciar'}</button>
          <p className="info-status"><span id="level">Nível: {difficulty}</span></p>
          <p className="info-status"><span id="score">Pontos: {score}</span></p>
        </div>

        <div className="wrapper">
          <div className="main-game">
            <div style={{
              display: 'grid',
              gridGap: '0.2rem',
              gridTemplateAreas: `'TopLeft TopRight'
                                  'BottomLeft BottomRight'`,
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              borderRadius: '100%',
              width: '80vh',
              height: '80vh',
            }}>

              {buttons.map(({ color, position, note }, index) => {

                return (
                  <Pad
                    key={color}
                    note={note}
                    padColor={color}
                    position={position}
                    allowClick={isClickAllowed}
                    handleClick={handleClick}
                    bindRef={(ref) => buttons[index].ref = ref} />
                )

              })}

            </div>
          </div>
          <div id="top-message-container"><span ref={refMessage} id="message">Clique em Iniciar</span></div>
        </div>

        <div>
          <div style={{ display: 'flex' }}>
            <a target="_blank" rel="noreferrer" title="Iberê' s linkedin page"
              href="https://www.linkedin.com/in/iber%C3%AA-abondanza-kuhlmann-0691b32a/">
              <img className="icon" src="/icons/linkedin.png" alt="Iberê' s linkedin page" />
            </a>

            <a target="_blank" rel="noreferrer" title="Iberê' s github page" href="https://github.com/ibere82">
              <img className="icon" src="/icons/github.png" alt="Iberê' s github page" />
            </a>
          </div>
        </div>

      </main>
      <footer>
        <p>&copy;
          <a target="_blank" rel="noreferrer" href="https://github.com/ibere82">Iberê Abondanza Kuhlmann</a>
        </p>
        <p>Developed based on
          <a target="_blank" rel="noreferrer" href="https://github.com/SpruceGabriela/genesis-dio">
            this Gabriela Pinheiro's Repository</a> as a task for the Eduzz Fullstack Developer Bootcamp from
          <a target="_blank" rel="noreferrer" href="https://digitalinnovation.one/">DIO - Digital Inovation One</a>
        </p>
      </footer>



    </>
  );
}


export default App;
