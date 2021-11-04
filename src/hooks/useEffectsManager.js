import { useEffect, useRef, } from 'react';
import * as actionTypes from '../state/actionsTypes.js';
import { winMusic, gameOverMusic } from '../data';

const {
  LOAD,
  START_GAME,
  START_LEVEL,
  GAME_PASSIVE,
  BUTTON_ACTION,
  STOP,
  SET_MESSAGE,
} = actionTypes;

export default function useEffectsManager(state, dispatch, soundsApi) {

  const { current } = useRef({ rightNow: { onGame: false } });
  const { playMusic, attackSound, releaseSound, } = soundsApi;
  const {
    buttons,
    timeToTurnOff,
    timeToResolve,
    level,
    round,
    shuffledOrder,
    nextLevelMessage,
    winMessages,
    gameNumber,
    gameOver,
    userWins,
    onGame,
    noteToTrigger,
  } = state;

  useEffect(() => {
    dispatch({ type: LOAD });
  }, []);

  useEffect(() => {
    if (gameNumber > 0) dispatch({ type: START_GAME });
  }, [gameNumber]);

  useEffect(() => {
    if (gameOver)
      (async () => {
        current.rightNow.onGame = false;
        await playMusic(gameOverMusic);
        dispatch({ type: STOP });
      })();
  }, [gameOver])

  useEffect(() => {
    if (userWins)
      (async () => {
        const victoryConcertArray = [...winMusic, ...winMusic, ...winMusic, ...winMusic];
        await victoryConcert(victoryConcertArray);
        dispatch({ type: STOP, payload: { message: winMessages[1] } });
        current.rightNow.onGame = false;
      })();
  }, [userWins]);

  useEffect(() => {
    current.rightNow.onGame = onGame;
    if (!onGame) releaseSound();
  }, [onGame]);

  useEffect(() => {
    (async () => {
      if (level > 0) {
        await manageEphemeralMessage(`${nextLevelMessage} ${level}`);
        dispatch({ type: START_LEVEL });
      }
    })();
  }, [level]);

  useEffect(() => {
    if (round > 0 && onGame) {
      setTimeout(async () => {

        for (let color of shuffledOrder) {
          if (current.rightNow.onGame)
            await scheduleOnOffPads(color, timeToTurnOff, timeToResolve);
        };

        dispatch({ type: GAME_PASSIVE });
      }, 500);
    }
  }, [round]);

  useEffect(() => {
    if (noteToTrigger !== '') attackSound(noteToTrigger)
    else releaseSound();
  }, [noteToTrigger]);

  const scheduleOnOffPads = (color, timeDuring = 50, timeAfter = 75) => {
    return new Promise((resolve) => {
      dispatch({ type: BUTTON_ACTION, payload: { color, status: 'ON' } });
      setTimeout(() => {
        dispatch({ type: BUTTON_ACTION, payload: { color, status: 'OFF' } });
      }, timeDuring);
      setTimeout(() => {
        resolve();
      }, timeAfter);
    });
  };

  const victoryConcert = (lightsAndSoundsArray) => {
    return new Promise(async (resolve) => {
      for (let index of lightsAndSoundsArray) {
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
};
