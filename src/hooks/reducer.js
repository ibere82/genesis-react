import { CLICK, PLAY_SEQUENCE, START, STOP, SET_MESSAGE, ADD_NEW_COLOR, GAME_PASSIVE, LOAD, CHANGE_LANGUAGE } from '../state/actionsTypes.js';
import { READY_TO_NEW_LEVEL, READY_TO_NEW_ROUND, READY_TO_TRIGGER_BUTTONS, GAME_OVER, USER_WINS, STOPPED, WAITING_FOR_USER_CLICKS } from '../state/effectsTypes.js'

function reducer(state, { type, payload = {} }) {

  const {
    configs,
    data,
    initialGameState,
    currentGameState,
    options,
  } = state;

  const newCurrentGameState = { ...currentGameState }

  const increaseClickCount = () => {
    newCurrentGameState.clickCount++
  };

  const increaseRound = () => {
    newCurrentGameState.clickCount = 0
    newCurrentGameState.round++
    newCurrentGameState.isClickAllowed = false
  };

  const increaseLevel = () => {
    newCurrentGameState.level++
    newCurrentGameState.round = 0
    newCurrentGameState.shuffledOrder = []
  };

  const increaseScore = (add) => {
    newCurrentGameState.score += add
  };

  const actions = {

    [CLICK]: () => {

      // early return if user loses
      if (newCurrentGameState.shuffledOrder[newCurrentGameState.clickCount] !== payload.color) {
        newCurrentGameState.isClickAllowed = false;
        newCurrentGameState.effect = GAME_OVER;
        return { ...state, currentGameState: newCurrentGameState }
      }

      increaseClickCount();
      increaseScore((newCurrentGameState.level * (configs.maxTonesByLevel)))
      // early return if the last click is correct but the click section is not finished
      if (newCurrentGameState.clickCount !== newCurrentGameState.shuffledOrder.length) {
        return { ...state, currentGameState: newCurrentGameState }
      }

      increaseRound();
      //early return if is new round but not new level
      if (newCurrentGameState.round < configs.maxTonesByLevel) {
        newCurrentGameState.effect = READY_TO_NEW_ROUND;
        return { ...state, currentGameState: newCurrentGameState }
      }

      increaseLevel();
      // early return if is new level
      if (newCurrentGameState.level < configs.maxLevel) {
        newCurrentGameState.effect = READY_TO_NEW_LEVEL
        return { ...state, currentGameState: newCurrentGameState }
      }

      // userwins
      newCurrentGameState.isClickAllowed = false;
      newCurrentGameState.effect = USER_WINS
      return { ...state, currentGameState: newCurrentGameState }
    },

    [PLAY_SEQUENCE]: () => {
      const { shuffledOrder } = newCurrentGameState
      newCurrentGameState.shuffledOrder = [...shuffledOrder, payload.newColor]
      return { ...state, currentGameState: newCurrentGameState }
    },

    [START]: () => {
      return {
        ...state,
        currentGameState: {
          ...initialGameState,
          level: configs.startLevel,
          onGame: true,
          effect: READY_TO_NEW_LEVEL
        }
      }
    },

    [STOP]: () => {
      const message = payload.message || newCurrentGameState.message
      return { ...state, currentGameState: { ...newCurrentGameState, message, effect: STOPPED, onGame: false, isClickAllowed: false } }
    },

    [SET_MESSAGE]: () => {
      const { message } = payload
      return { ...state, currentGameState: { ...newCurrentGameState, message } }
    },

    [ADD_NEW_COLOR]: () => {
      return { ...state, currentGameState: { ...newCurrentGameState, shuffledOrder: [...newCurrentGameState.shuffledOrder, payload.newColor], effect: READY_TO_TRIGGER_BUTTONS, isClickAllowed: false } }
    },

    [GAME_PASSIVE]: () => {
      return { ...state, currentGameState: { ...newCurrentGameState, effect: WAITING_FOR_USER_CLICKS, isClickAllowed: true } }
    },

    [LOAD]: () => {
      const index = data.textsStore.languages.findIndex(({ short }) => options.currentLanguage === short)
      const texts = data.textsStore.texts[index]
      return { ...state, texts, currentGameState: { ...newCurrentGameState, message: texts.topMessages.wellcomeMessage } }
    },

    [CHANGE_LANGUAGE]: () => {
      const index = data.textsStore.languages.findIndex(({ short }) => payload.lang === short)
      const texts = data.textsStore.texts[index]
      return { ...state, texts, currentGameState: newCurrentGameState }
    },
  };

  return actions[type]();

};

export default reducer