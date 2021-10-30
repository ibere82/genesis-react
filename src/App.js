import { useEffect, useRef, useReducer } from 'react';
import * as Tone from 'tone';
import * as actionTypes from './state/actionsTypes.js';
import reducer from './hooks/reducer';
import initialState from './state/gameState.js';
import { winMusic, gameOverMusic } from './data';
import Page from './components/main/Page';
import * as effectsTypes from './state/effectsTypes.js';

const synth = new Tone.AMSynth().toDestination();

const {
  INITIAL,
  READY_TO_NEW_LEVEL,
  READY_TO_NEW_ROUND,
  READY_TO_TRIGGER_BUTTONS,
  GAME_OVER,
  USER_WINS,
  STOPPED,
  WAITING_FOR_USER_CLICKS,
  READY_TO_ATTACK_SOUND,
  READY_TO_RELEASE_SOUND,
} = effectsTypes;

const {
  STOP,
  SET_MESSAGE,
  ADD_NEW_COLOR,
  GAME_PASSIVE,
  LOAD,
  TURN_BUTTON_ON,
  TURN_BUTTON_OFF,
} = actionTypes;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { current } = useRef({ onGameRightNow: false });
  const { currentLevelOptions, level, shuffledOrder, effect, texts, noteToTrigger } = state;
  const { buttons } = currentLevelOptions;
  const { nextLevelMessage, gameOverMessage, winMessages, } = texts;

  useEffect(() => {

    const effects = {

      [INITIAL]: () => {
        dispatch({ type: LOAD });
      },

      [READY_TO_NEW_LEVEL]: async () => {
        current.onGameRightNow = true;
        await manageEphemeralMessage(`${nextLevelMessage} ${level}`);
        if (current.onGameRightNow) addNewShuffledColor();
      },

      [READY_TO_NEW_ROUND]: () => {
        setTimeout(() => {
          addNewShuffledColor();
        }, 500);
      },

      [READY_TO_TRIGGER_BUTTONS]: async () => {
        for (let color of shuffledOrder) {
          if (current.onGameRightNow) await scheduleOnOffPads(color);
        };
        dispatch({ type: GAME_PASSIVE });
      },

      [GAME_OVER]: async () => {
        dispatch({ type: SET_MESSAGE, payload: { message: gameOverMessage } });
        await playGameOverMusic();
        dispatch({ type: STOP });
      },

      [USER_WINS]: async () => {
        dispatch({ type: SET_MESSAGE, payload: { message: winMessages[0] } });
        await playVictoryShow();
        dispatch({ type: STOP, payload: { message: winMessages[1] } });
      },

      [STOPPED]: () => {
        synth.triggerRelease();
        current.onGameRightNow = false;
      },

      [READY_TO_ATTACK_SOUND]: () => {
        synth.triggerAttack(noteToTrigger);
      },

      [READY_TO_RELEASE_SOUND]: () => {
        synth.triggerRelease();
      },

      [WAITING_FOR_USER_CLICKS]: () => {
        // TODO: after 3000ms ask user to play 
      }

    };

    effects[effect]();

  }, [effect]);

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

  const addNewShuffledColor = async () => {
    const randomic = Math.floor(Math.random() * 4);
    dispatch({ type: ADD_NEW_COLOR, payload: { newColor: buttons[randomic].color } });
  };

  const scheduleOnOffPads = (color) => {
    const { timeToTurnOff, timeToResolve } = currentLevelOptions;

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: TURN_BUTTON_ON, payload: { color } });
      }, 10);
      setTimeout(() => {
        dispatch({ type: TURN_BUTTON_OFF, payload: { color } });
      }, timeToTurnOff);
      setTimeout(() => {
        resolve();
      }, timeToResolve);
    });
  };

  const playVictoryShow = () => {
    const wholeMusic = [...winMusic, ...winMusic, ...winMusic, ...winMusic];
    return new Promise(async (resolve) => {
      for (let index of wholeMusic) {
        if (current.onGameRightNow) await scheduleOnOffPads(buttons[index].color);
      };
      resolve();
    });
  };

  const manageEphemeralMessage = (text, timeBefore = 0, timeDuring = 2000, timeAfter = 2500) => {
    return new Promise((resolve) => {

      setTimeout(() => {
        if (current.onGameRightNow) dispatch({ type: SET_MESSAGE, payload: { message: text } });
      }, timeBefore);

      setTimeout(() => {
        if (current.onGameRightNow) dispatch({ type: SET_MESSAGE, payload: { message: '' } });
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
