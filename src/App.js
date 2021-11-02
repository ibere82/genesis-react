import { useEffect, useRef, useReducer } from 'react';
import * as Tone from 'tone';
import * as actionTypes from './state/actionsTypes.js';
import reducer from './hooks/reducer';
import initialState from './state/gameState.js';
import { winMusic, gameOverMusic } from './data';
import Page from './components/main/Page';

const synth = new Tone.AMSynth().toDestination();

const {
  LOAD,
  START_GAME,
  START_LEVEL,
  GAME_PASSIVE,
  TURN_BUTTON_ON,
  TURN_BUTTON_OFF,
  STOP,
  SET_MESSAGE,
} = actionTypes;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { current } = useRef({ rightNow: { onGame: false } });
  const { currentLevelOptions, level, round, shuffledOrder, texts, noteToTrigger, gameNumber, onGame, userWins, gameOver } = state;
  const { buttons } = currentLevelOptions;
  const { nextLevelMessage, winMessages, } = texts;


  useEffect(() => {
    dispatch({ type: LOAD });
  }, [])

  useEffect(() => {
    if (gameNumber > 0) dispatch({ type: START_GAME })
  }, [gameNumber])

  useEffect(() => {
    if (gameOver) (async () => {
      current.rightNow.onGame = false
      await playGameOverMusic();
      dispatch({ type: STOP });
    })();
  }, [gameOver])

  useEffect(() => {
    if (userWins) (async () => {
      await playVictoryShow();
      dispatch({ type: STOP, payload: { message: winMessages[1] } });
      current.rightNow.onGame = false
    })();
  }, [userWins]);

  useEffect(() => {
    current.rightNow.onGame = onGame
    if (!onGame) synth.triggerRelease()
  }, [onGame])

  useEffect(() => {
    (async () => {
      if (level > 0) {
        await manageEphemeralMessage(`${nextLevelMessage} ${level}`);
        dispatch({ type: START_LEVEL })
      }
    })();
  }, [level])

  useEffect(() => {
    const { timeToTurnOff, timeToResolve } = currentLevelOptions;
    if (round) {
      setTimeout(async () => {
        for (let color of shuffledOrder) {
          if (current.rightNow.onGame) await scheduleOnOffPads(color, timeToTurnOff, timeToResolve);
        };
        dispatch({ type: GAME_PASSIVE });
      }, 500);
    }
  }, [round])

  useEffect(() => {
    if (noteToTrigger !== '') synth.triggerAttack(noteToTrigger)
    else synth.triggerRelease();
  }, [noteToTrigger])

  const playGameOverMusic = () => {
    return new Promise((resolve) => {
      const now = Tone.now();
      gameOverMusic.forEach((note, index) => {
        synth.triggerAttackRelease(note, '8n', now + (index / 20))
      });
      setTimeout(() => {
        resolve();
      }, 2500);
    });
  };

  const scheduleOnOffPads = (color, timeDuring = 50, timeAfter = 75) => {
    return new Promise((resolve) => {
      dispatch({ type: TURN_BUTTON_ON, payload: { color } });
      setTimeout(() => {
        dispatch({ type: TURN_BUTTON_OFF, payload: { color } });
      }, timeDuring);
      setTimeout(() => {
        resolve();
      }, timeAfter);
    });
  };

  const playVictoryShow = () => {
    const wholeMusic = [...winMusic, ...winMusic, ...winMusic, ...winMusic];
    return new Promise(async (resolve) => {
      for (let index of wholeMusic) {
        if (current.rightNow.onGame) await scheduleOnOffPads(buttons[index].color);
      };
      resolve();
    });
  };

  const manageEphemeralMessage = (text, timeBefore = 0, timeDuring = 2000, timeAfter = 2500) => {
    return new Promise((resolve) => {

      setTimeout(() => {
        if (current.rightNow.onGame) dispatch({ type: SET_MESSAGE, payload: { message: text } });
      }, timeBefore);

      setTimeout(() => {
        if (current.rightNow.onGame) dispatch({ type: SET_MESSAGE, payload: { message: '' } });
      }, timeDuring);

      setTimeout(() => {
        resolve();
      }, timeAfter);
    });
  };

  return (
    <Page
      state={state}
      dispatch={dispatch}
    />
  );
};

export default App;
