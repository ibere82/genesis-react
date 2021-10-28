import { useEffect, useRef, useReducer } from 'react';
import reducer from './hooks/reducer';
import { STOP, SET_MESSAGE, ADD_NEW_COLOR, GAME_PASSIVE, LOAD } from './state/actionsTypes.js';
import { INITIAL, READY_TO_NEW_LEVEL, READY_TO_NEW_ROUND, READY_TO_TRIGGER_BUTTONS, GAME_OVER, USER_WINS, STOPPED, WAITING_FOR_USER_CLICKS } from './state/effectsTypes.js'
import * as Tone from 'tone';
import Page from './components/Page';
import appState from './state/appState.js';

const synth = new Tone.AMSynth().toDestination();

function App() {
  const [state, dispatch] = useReducer(reducer, appState);
  const { current } = useRef({ allowTriggerSound: false });

  const { currentGameState, data, configs, texts } = state;
  const { winMusic, gameOverMusic } = data;
  const { levelTimes, buttons, maxLevel } = configs;
  const { level, shuffledOrder, effect } = currentGameState;
  const { topMessages } = texts;
  const { nextLevelMessage, gameOverMessage, winMessages, } = topMessages

  useEffect(() => {

    const effects = {
      [INITIAL]: () => {
        dispatch({ type: LOAD })
      },

      [READY_TO_NEW_LEVEL]: async () => {
        current.allowTriggerSound = true;
        await manageEphemeralMessage(`${nextLevelMessage} ${level}`);
        if (current.allowTriggerSound) addNewShuffledColor();
      },

      [READY_TO_NEW_ROUND]: () => {
        setTimeout(() => {
          addNewShuffledColor();
        }, 500);
      },

      [READY_TO_TRIGGER_BUTTONS]: async () => {
        for (let color of shuffledOrder) {
          if (current.allowTriggerSound) await scheduleOnOffPads(color, level - 1);
        };
        dispatch({ type: GAME_PASSIVE })
      },

      [GAME_OVER]: async () => {
        dispatch({ type: SET_MESSAGE, payload: { message: gameOverMessage } })
        await playGameOverMusic()
        dispatch({ type: STOP })
      },

      [USER_WINS]: async () => {
        dispatch({ type: SET_MESSAGE, payload: { message: winMessages[0] } })
        await playVictoryShow();
        dispatch({ type: STOP, payload: { message: winMessages[1] } })
      },

      [STOPPED]: () => {
        synth.triggerRelease();
        current.allowTriggerSound = false;
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
    dispatch({ type: ADD_NEW_COLOR, payload: { newColor: buttons[randomic].color } })
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

  const playVictoryShow = () => {
    const wholeMusic = [...winMusic, ...winMusic, ...winMusic, ...winMusic];
    return new Promise(async (resolve) => {
      for (let index of wholeMusic) {
        if (current.allowTriggerSound) await scheduleOnOffPads(buttons[index].color, maxLevel - 1);
      };
      resolve();
    });
  };

  const manageEphemeralMessage = (text, timeBefore = 0, timeDuring = 2000, timeAfter = 2500) => {
    return new Promise((resolve) => {

      setTimeout(() => {
        if (current.allowTriggerSound) dispatch({ type: SET_MESSAGE, payload: { message: text } })
      }, timeBefore);

      setTimeout(() => {
        if (current.allowTriggerSound) dispatch({ type: SET_MESSAGE, payload: { message: '' } })
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
