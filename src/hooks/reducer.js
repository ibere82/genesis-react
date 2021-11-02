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
  TURN_BUTTON_ON,
  TURN_BUTTON_OFF,
  STOP,
  SET_MESSAGE,
  CHANGE_LANGUAGE,
} = actionTypes;

function reducer(state, { type, payload = {} }) {

  // an alternative to the classic switch to allow internal scope in each case
  // each property in actions object corresponds to a function that will be 
  // dynamically called using the 'type' as property name.

  const actions = {

    [CLICK]: () => {

      const newState = { ...state };

      // early return if user loses
      newState.clickCount++;
      if (newState.shuffledOrder[newState.clickCount - 1] !== payload.color) {
        newState.isClickAllowed = false;
        newState.message = newState.texts.gameOverMessage;
        newState.gameOver = true;
        return newState;
      }

      newState.score += newState.currentLevelOptions.pointsOnCorrectClick;
      // early return if the last click is correct but the click section is not finished
      if (newState.clickCount !== newState.shuffledOrder.length) {
        return newState;
      };

      newState.score += newState.currentLevelOptions.bonusForFinishedRound;
      newState.clickCount = 0;

      const randomic = Math.floor(Math.random() * 4);
      newState.shuffledOrder = [...state.shuffledOrder, state.currentLevelOptions.buttons[randomic].color]
      newState.round++;
      newState.isClickAllowed = false;

      //early return if is new round but not new level
      if (newState.round <= newState.currentLevelOptions.rounds) {
        return newState;
      }

      newState.level++;
      newState.score = newState.currentLevelOptions.roundedScoreOnLevelEnd;
      newState.round = 0;
      newState.shuffledOrder = [];
      // early return if is new level
      if (newState.level <= data.levelInfos.length) {
        const newLevelOptions = data.levelInfos[newState.level - 1];
        const { buttons } = newLevelOptions;
        const newButtons = buttons.map(button => ({ ...button, isLightOn: false }));
        newLevelOptions.buttons = newButtons;
        newState.currentLevelOptions = newLevelOptions;

        return newState;
      };

      // userwins
      newState.level = data.levelInfos.length;
      newState.isClickAllowed = false;
      newState.message = newState.texts.winMessages[0];
      newState.userWins = true;
      return newState;
    },

    [TURN_BUTTON_ON]: () => {
      let noteToTrigger = '';
      const newButtons = state.currentLevelOptions.buttons.map(button => {
        const newButton = { ...button };
        if (button.color === payload.color) {
          newButton.isLightOn = true;
          noteToTrigger = button.note;
        };

        return newButton;
      });
      const newLevelOptions = { ...state.currentLevelOptions, buttons: newButtons };
      return { ...state, currentLevelOptions: newLevelOptions, noteToTrigger };
    },

    [TURN_BUTTON_OFF]: () => {
      const newButtons = state.currentLevelOptions.buttons.map(button => {
        const newButton = { ...button };
        if (button.color === payload.color) newButton.isLightOn = false;
        return newButton;
      })
      const newLevelOptions = { ...state.currentLevelOptions, buttons: newButtons };
      return { ...state, currentLevelOptions: newLevelOptions, noteToTrigger: '' };
    },

    [NEW_GAME]: () => {
      const newLevelOptions = data.levelInfos[config.startLevel - 1];
      const { buttons } = newLevelOptions;
      const newButtons = buttons.map(button => ({ ...button, isLightOn: false }));
      newLevelOptions.buttons = newButtons;

      return {
        ...state,
        gameNumber: state.gameNumber + 1,
        currentLevelOptions: newLevelOptions,
        shuffledOrder: [],
        clickCount: null,
        isClickAllowed: false,
        score: 0,
        message: '',
        level: null,
        round: null,
        onGame: true,

      };
    },

    [STOP]: () => {
      const message = payload.message || state.message;
      return {
        ...state,
        message,
        onGame: false,
        isClickAllowed: false,
        gameOver: false,
        userWins: false,
      };
    },

    [START_GAME]: () => {
      return {
        ...state,
        level: config.startLevel
      }
    },

    [START_LEVEL]: () => {
      const randomic = Math.floor(Math.random() * 4);
      const shuffledOrder = [...state.shuffledOrder, state.currentLevelOptions.buttons[randomic].color]
      const round = state.round + 1
      return { ...state, shuffledOrder, round }
    },

    [SET_MESSAGE]: () => {
      return { ...state, message: payload.message };
    },

    [GAME_PASSIVE]: () => {
      return { ...state, isClickAllowed: true };
    },

    [LOAD]: () => {
      const { navigator } = window;
      const secureNavLangList = navigator.languages || [];
      const clientLanguages = [navigator.language, ...secureNavLangList];
      const { languages } = data.textStorage;
      const clientLanguage = languages.find(({ short, ISO }) => {
        const clientLang = clientLanguages.find(lang => short === lang || ISO === lang);
        return clientLang === short || clientLang === ISO;
      });

      const selectedLanguage = clientLanguage ? clientLanguage.short : config.defaultLanguage;
      const languageIndex = languages.findIndex(({ short }) => selectedLanguage === short);
      const texts = data.textStorage.texts[languageIndex];
      const message = texts.wellcomeMessage;
      const newLevelOptions = data.levelInfos[config.startLevel - 1];
      const { buttons } = newLevelOptions;
      const newButtons = buttons.map(button => ({ ...button, isLightOn: false }));
      newLevelOptions.buttons = newButtons;
      return { ...state, currentLevelOptions: newLevelOptions, languages, texts, message, };
    },

    [CHANGE_LANGUAGE]: () => {
      const index = data.textStorage.languages.findIndex(({ short }) => payload.lang === short);
      const texts = data.textStorage.texts[index];
      const message = state.onGame ? '' : texts.wellcomeMessage;
      return { ...state, message, texts };
    },
  };

  const newState = actions[type]();

  return newState;
};

export default reducer;