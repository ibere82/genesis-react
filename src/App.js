import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import buttons from './data/buttons.json';
import levelTimes from './data/levelTimes.json';
import winMusic from './data/winMusic.json';
import gameOverMusic from './data/gameOverMusic.json';
import Page from './components/Page';
import './App.css';

const synth = new Tone.AMSynth().toDestination();

const MAX_TONES_BY_LEVEL = 12;
const MAX_LEVEL = levelTimes.length;

function App() {
  const [shuffledOrder, setShuffledOrder] = useState([]);
  const [turn, setTurn] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isClickAllowed, setIsClickAllowed] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const { current } = useRef({ onGame: false });
  const { onGame } = current;

  useEffect(() => {
    setMessage('Bem vindo ao Genius!');
  }, []);

  useEffect(() => {
    if (onGame) (async () => {
      await manageEphemeralMessage(`Iniciando nível ${difficulty}`);
      setShuffledOrder([]);
      setTurn(1);
    })();
  }, [difficulty]);

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
        if (current.onGame) await scheduleOnOffPads(color, difficulty - 1);
      };
      setIsClickAllowed(true);
    })()
  }, [shuffledOrder])

  useEffect(() => {
    setIsClickAllowed(message === '');
  }, [message]);

  const startNewGame = () => {
    setScore(0);
    setDifficulty(1);
    current.onGame = true;
  };

  const stopGame = () => {
    synth.triggerRelease();
    current.onGame = false;
    setDifficulty(0);
    setTurn(0);
  };

  const gameOver = async () => {
    return new Promise((resolve) => {
      setIsClickAllowed(false);
      setMessage('Que pena! Você perdeu! Clique em Iniciar para recomeçar');
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
    await playWinMusic();
    setMessage('Você venceu!! Clique em Iniciar para recomeçar');
    stopGame();
  };

  const playWinMusic = () => {
    return new Promise(async (resolve) => {

      for (let index of winMusic) {
        await scheduleOnOffPads(buttons[index].color, 7);
      };
      for (let index of winMusic) {
        await scheduleOnOffPads(buttons[index].color, 7);
      };
      for (let index of winMusic) {
        await scheduleOnOffPads(buttons[index].color, 7);
      };
      for (let index of winMusic) {
        await scheduleOnOffPads(buttons[index].color, 7);
      };
      resolve();
    });
  };


  const handleClick = async (color) => {
    if (shuffledOrder[clickCount] !== color) {
      await gameOver();
      stopGame();
    }
    else {
      setScore(score + difficulty);
      const newClickCount = clickCount + 1;
      if (newClickCount === shuffledOrder.length) {
        if (turn < MAX_TONES_BY_LEVEL) setTurn(turn + 1)
        else {
          const newLevel = difficulty + 1;
          if (newLevel > MAX_LEVEL) userWins();
          else setDifficulty(difficulty + 1);
        };
      };
      setClickCount(newClickCount);
    };
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
      difficulty={difficulty}
      score={score}
      message={message}
    />
  );
};

export default App;
