import React from 'react';
import * as actionTypes from '../state/actionsTypes.js';
import * as data from '../data';
import config from '../config';

const {
  LOAD,
  NEW_GAME,
  START_GAME,
  START_LEVEL,
  GAME_PASSIVE,
  CLICK,
  STOP,
  SET_MESSAGE,
  CHANGE_LANGUAGE,
  BUTTON_ACTION,
} = actionTypes;

export default function useStateManager(initialState) {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { currentLevelOptions, texts, ...rest } = state;

  const currentState = {
    ...rest,
    ...texts,
    ...currentLevelOptions,
  };

  return [currentState, dispatch];
}

function reducer(state, { type, payload = {} }) {

  switch (type) {

    case CLICK:
      return clickAction({ ...state }, payload.color)

    case BUTTON_ACTION:
      return buttonAction(payload.status === 'ON')

    case NEW_GAME:
      return newLevelAction()

    case STOP:
      return stopAction(payload.message || state.message);

    case START_GAME:
      return { ...state, level: config.startLevel }

    case START_LEVEL:

      return newRoundState({ ...state })

    case SET_MESSAGE:
      return { ...state, message: payload.message };

    case GAME_PASSIVE:
      return { ...state, isClickAllowed: true };

    case LOAD:
      return loadAction()

    case CHANGE_LANGUAGE:
      return changeLanguageAction()

    default:
      return state;

  };

  function clickAction(state, color) {

    let newState = { ...state };

    //increase click count
    newState.clickCount++;

    // early return if user loses
    if (newState.shuffledOrder[newState.clickCount - 1] !== color) return gameOverState(newState);

    // the user should receive points for getting the last click right.
    newState.score += newState.currentLevelOptions.pointsOnCorrectClick;

    // early return if the last click is correct but the click section is not finished
    if (newState.clickCount !== newState.shuffledOrder.length) return newState;

    // the user should receive points for finishing this round.
    newState.score += newState.currentLevelOptions.bonusForFinishedRound;

    // new round
    newState = newRoundState(newState);

    // early return if is new round but not new level
    const rounds = config.imperativeMaxRound || newState.currentLevelOptions.rounds;
    if (newState.round <= rounds) return newState;

    // increase level
    newState.level++;

    // the user should receive points for finishing this level.
    newState.score = newState.currentLevelOptions.roundedScoreOnLevelEnd;

    newState.round = 0;
    newState.shuffledOrder = [];
    // early return if is new level but the user not wins yet
    if (newState.level <= data.levelInfos.length) {
      return { ...newState, currentLevelOptions: loadLevelInfos(newState.level - 1) }
    };

    // userwins
    newState.level = data.levelInfos.length;
    newState.isClickAllowed = false;
    newState.message = newState.texts.winMessages[0];
    newState.userWins = true;
    return newState;
  }

  function gameOverState(newState) {
    newState.isClickAllowed = false;
    newState.message = newState.texts.gameOverMessage;
    newState.gameOver = true;
    return newState;
  }

  function newRoundState(newState) {
    newState.clickCount = 0;
    const randomic = Math.floor(Math.random() * 4);
    const newColor = newState.currentLevelOptions.buttons[randomic].color;
    newState.shuffledOrder = [...newState.shuffledOrder, newColor];
    newState.round = newState.round + 1;
    newState.isClickAllowed = false;
    return newState;
  };

  function loadLevelInfos(level) {
    const newLevelOptions = data.levelInfos[level];
    const { buttons } = newLevelOptions;
    const newButtons = buttons.map(button => ({ ...button, isLightOn: false }));
    newLevelOptions.buttons = newButtons;
    return newLevelOptions;
  }

  function switchLanguage(newLanguage) {
    const index = data.textStorage.languages.findIndex(({ short }) => newLanguage === short);
    const texts = data.textStorage.texts[index];
    return texts;
  }

  function getClientLanguage() {
    const { navigator } = window;
    const secureNavLangList = navigator.languages || [];
    const clientLanguages = [navigator.language, ...secureNavLangList];
    const { languages } = data.textStorage;
    const clientLanguage = languages.find(({ short, ISO }) => {
      const clientLang = clientLanguages.find(lang => short === lang || ISO === lang);
      return clientLang === short || clientLang === ISO;
    });
    return clientLanguage;
  }

  function buttonAction(turnOn) {
    let noteToTrigger = '';
    const newButtons = state.currentLevelOptions.buttons.map(button => {
      const newButton = { ...button };
      if (button.color === payload.color) {
        newButton.isLightOn = turnOn;
        noteToTrigger = turnOn ? button.note : '';
      };
      return newButton;
    });
    const newLevelOptions = { ...state.currentLevelOptions, buttons: newButtons };
    return { ...state, currentLevelOptions: newLevelOptions, noteToTrigger };
  };

  function newLevelAction() {
    const newLevelOptions = loadLevelInfos(config.startLevel - 1)
    return {
      ...state,
      onGame: true,
      gameNumber: state.gameNumber + 1,
      shuffledOrder: [],
      currentLevelOptions: newLevelOptions,
      clickCount: null,
      isClickAllowed: false,
      score: 0,
      message: '',
      level: null,
      round: null,
    };
  }

  function stopAction(message) {
    return {
      ...state,
      message,
      onGame: false,
      isClickAllowed: false,
      round: null,
      gameOver: false,
      userWins: false,
    };
  }

  function loadAction() {
    const { languages } = data.textStorage;
    const clientLanguage = getClientLanguage();
    const selectedLanguage = clientLanguage ? clientLanguage.short : config.defaultLanguage;
    const texts = switchLanguage(selectedLanguage);
    const message = texts.wellcomeMessage;

    return {
      ...state,
      currentLevelOptions: loadLevelInfos(config.startLevel - 1),
      languages,
      texts,
      message,
    };
  }

  function changeLanguageAction() {
    const texts = switchLanguage(payload.lang);
    const message = state.onGame ? '' : texts.wellcomeMessage;
    return { ...state, message, texts };
  }
}