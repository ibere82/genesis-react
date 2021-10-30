import * as actionTypes from '../state/actionsTypes.js';
import * as effectTypes from '../state/effectsTypes.js';
import * as data from '../data';
import config from '../config';

const {
  CLICK,
  START,
  STOP,
  SET_MESSAGE,
  ADD_NEW_COLOR,
  GAME_PASSIVE,
  LOAD,
  CHANGE_LANGUAGE,
  TURN_BUTTON_ON,
  TURN_BUTTON_OFF,
} = actionTypes;

const {
  READY_TO_NEW_LEVEL,
  READY_TO_NEW_ROUND,
  READY_TO_TRIGGER_BUTTONS,
  GAME_OVER,
  USER_WINS,
  STOPPED,
  WAITING_FOR_USER_CLICKS,
  READY_TO_ATTACK_SOUND,
  READY_TO_RELEASE_SOUND,
} = effectTypes;

function reducer(state, { type, payload = {} }) {

  const actions = {

    [CLICK]: () => {

      const newState = { ...state };

      // early return if user loses
      if (newState.shuffledOrder[newState.clickCount] !== payload.color) {
        newState.isClickAllowed = false;
        newState.effect = GAME_OVER;
        return newState;
      }

      newState.clickCount++;
      newState.score += newState.currentLevelOptions.pointsOnCorrectClick;
      // early return if the last click is correct but the click section is not finished
      if (newState.clickCount !== newState.shuffledOrder.length) {
        return newState;
      };

      newState.score += newState.currentLevelOptions.bonusForFinishedRound;
      newState.clickCount = 0;
      newState.round++;
      newState.isClickAllowed = false;

      //early return if is new round but not new level
      if (newState.round < newState.currentLevelOptions.rounds) {
        newState.effect = READY_TO_NEW_ROUND;
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
        newState.effect = READY_TO_NEW_LEVEL;
        return newState;
      };

      // userwins
      newState.level = data.levelInfos.length;
      newState.isClickAllowed = false;
      newState.effect = USER_WINS;
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
      return { ...state, currentLevelOptions: newLevelOptions, effect: READY_TO_ATTACK_SOUND, noteToTrigger };
    },

    [TURN_BUTTON_OFF]: () => {
      const newButtons = state.currentLevelOptions.buttons.map(button => {
        const newButton = { ...button };
        if (button.color === payload.color) newButton.isLightOn = false;
        return newButton;
      })
      const newLevelOptions = { ...state.currentLevelOptions, buttons: newButtons };
      return { ...state, currentLevelOptions: newLevelOptions, effect: READY_TO_RELEASE_SOUND };
    },

    [START]: () => {
      const newLevelOptions = data.levelInfos[config.startLevel - 1];
      const { buttons } = newLevelOptions;
      const newButtons = buttons.map(button => ({ ...button, isLightOn: false }));
      newLevelOptions.buttons = newButtons;

      return {
        ...state,
        currentLevelOptions: newLevelOptions,
        shuffledOrder: [],
        round: 0,
        clickCount: 0,
        isClickAllowed: false,
        score: 0,
        message: '',
        level: config.startLevel,
        onGame: true,
        effect: READY_TO_NEW_LEVEL,
      };
    },

    [STOP]: () => {
      const message = payload.message || state.message;
      return {
        ...state,
        message,
        effect: STOPPED,
        onGame: false,
        isClickAllowed: false
      };
    },

    [SET_MESSAGE]: () => {
      return { ...state, message: payload.message };
    },

    [ADD_NEW_COLOR]: () => {
      const { newColor } = payload;
      return {
        ...state,
        shuffledOrder: [...state.shuffledOrder, newColor],
        effect: READY_TO_TRIGGER_BUTTONS,
        isClickAllowed: false
      };
    },

    [GAME_PASSIVE]: () => {
      return {
        ...state,
        effect: WAITING_FOR_USER_CLICKS,
        isClickAllowed: true
      };
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