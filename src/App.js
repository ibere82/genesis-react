import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import buttons from './data/buttons.json';
import levelTimes from './data/levelTimes.json';
import winMusic from './data/winMusic.json';
import gameOverMusic from './data/gameOverMusic.json';
import Page from './components/Page';

const synth = new Tone.AMSynth().toDestination();

const MAX_TONES_BY_LEVEL = 8;
const MAX_LEVEL = levelTimes.length;

function App() {
  const [shuffledOrder, setShuffledOrder] = useState([]);
  const [turn, setTurn] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isClickAllowed, setIsClickAllowed] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Olá e Boas vindas!!!');
  const { current } = useRef({ onGame: false });
  const { onGame } = current;

  useEffect(() => {
    if (onGame) (async () => {
      await manageEphemeralMessage(`Iniciando nível ${level}`);
      setShuffledOrder([]);
      setTurn(1);
    })();
  }, [level]);

  useEffect(() => {
    if (onGame) {
      setClickCount(0);
      setTimeout(() => {
        addNewShuffledColor();
      }, 500);
    };
  }, [turn]);

  useEffect(() => {
    (async () => {
      setIsClickAllowed(false);
      for (let color of shuffledOrder) {
        if (current.onGame) await scheduleOnOffPads(color, level - 1);
      };
      setIsClickAllowed(true);
    })()
  }, [shuffledOrder])

  useEffect(() => {
    setIsClickAllowed(message === '');
  }, [message]);

  const startNewGame = () => {
    setScore(0);
    setLevel(1);
    current.onGame = true;
  };

  const stopGame = () => {
    synth.triggerRelease();
    current.onGame = false;
    setLevel(0);
    setTurn(0);
  };

  const gameOver = async () => {
    setIsClickAllowed(false);
    setMessage('Que pena! Você perdeu! Clique em Iniciar para recomeçar');
    await playGameOverMusic()
    stopGame()
  };

  const manageCorrectClick = () => {
    setScore(score + (level * (MAX_TONES_BY_LEVEL)));
    checkForNextTurn()
  };

  const checkForNextTurn = () => {
    const newClickCount = clickCount + 1;
    if (newClickCount === shuffledOrder.length) increaseTurn();
    setClickCount(newClickCount);
  };

  const increaseTurn = () => {
    (turn < MAX_TONES_BY_LEVEL) ? setTurn(turn + 1) : increaseLevel()
  };

  const increaseLevel = () => {
    const newLevel = level + 1;
    (newLevel > MAX_LEVEL) ? userWins() : setLevel(newLevel);
  };

  const playGameOverMusic = () => {
    return new Promise((resolve) => {
      const now = Tone.now();
      gameOverMusic.forEach((note, index) =>
        synth.triggerAttackRelease(note, '8n', now + (index / 20)));
      setTimeout(() => {
        resolve();
      }, 2500);
    });
  };

  const addNewShuffledColor = async () => {
    const randomic = Math.floor(Math.random() * 4);
    setShuffledOrder([...shuffledOrder, buttons[randomic].color]);
  };

  const scheduleOnOffPads = (color, velocity) => {
    const { timeToTurnOff, timeToResolve } = levelTimes[velocity];
    const { ref } = buttons.find(button => button.color === color);

    return new Promise((resolve) => {
      setTimeout(() => {
        ref.turnOn();
      }, 10);
      setTimeout(() => {
        ref.turnOff();
      }, timeToTurnOff);
      setTimeout(() => {
        resolve();
      }, timeToResolve);
    });
  };

  const userWins = async () => {
    setMessage('Parabéns !!!!');
    await playVictoryShow();
    setMessage('Você venceu!! Clique em Iniciar para recomeçar');
    stopGame();
  };

  const playVictoryShow = () => {
    const wholeMusic = [...winMusic, ...winMusic, ...winMusic, ...winMusic];
    return new Promise(async (resolve) => {
      for (let index of wholeMusic) {
        if (current.onGame) await scheduleOnOffPads(buttons[index].color, MAX_LEVEL);
      };
      resolve();
    });
  };

  const handleClick = (color) => {
    (shuffledOrder[clickCount] === color) ? manageCorrectClick() : gameOver();
  };

  const manageEphemeralMessage = (text, timeBefore = 0, timeDuring = 2000, timeAfter = 2500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessage(text);
      }, timeBefore);
      setTimeout(() => {
        setMessage('');
      }, timeDuring);
      setTimeout(() => {
        resolve();
      }, timeAfter);
    });
  };

  return (
    <Page
      onGame={onGame}
      stopGame={stopGame}
      startNewGame={startNewGame}
      buttons={buttons}
      isClickAllowed={isClickAllowed}
      handleClick={handleClick}
      message={message}
      level={level}
      score={score}
    />
  );
};

export default App;
