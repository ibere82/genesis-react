import { CLICK, START, STOP, SET_MESSAGE, ADD_NEW_COLOR, GAME_PASSIVE, LOAD, CHANGE_LANGUAGE } from '../state/actionsTypes.js';
import { READY_TO_NEW_LEVEL, READY_TO_NEW_ROUND, READY_TO_TRIGGER_BUTTONS, GAME_OVER, USER_WINS, STOPPED, WAITING_FOR_USER_CLICKS } from '../state/effectsTypes.js'

function reducer(state, { type, payload = {} }) {

  const {
    configs,
    storage,
    mutable,
  } = state;

  const { game, texts, features } = mutable

  const actions = {

    [CLICK]: () => {

      const newGameState = { ...game }

      // early return if user loses
      if (newGameState.shuffledOrder[newGameState.clickCount] !== payload.color) {
        newGameState.isClickAllowed = false;
        newGameState.effect = GAME_OVER;
        return { texts, features, game: newGameState }
      }

      newGameState.clickCount++
      newGameState.score += newGameState.level * configs.maxTonesByLevel
      // early return if the last click is correct but the click section is not finished
      if (newGameState.clickCount !== newGameState.shuffledOrder.length) {
        return { texts, features, game: newGameState }
      }

      newGameState.clickCount = 0
      newGameState.round++
      newGameState.isClickAllowed = false
      //early return if is new round but not new level
      if (newGameState.round < configs.maxTonesByLevel) {
        newGameState.effect = READY_TO_NEW_ROUND;
        return { texts, features, game: newGameState }
      }

      newGameState.level++
      newGameState.round = 0
      newGameState.shuffledOrder = []
      // early return if is new level
      if (newGameState.level < configs.maxLevel) {
        newGameState.effect = READY_TO_NEW_LEVEL
        return { texts, features, game: newGameState }
      }

      // userwins
      newGameState.isClickAllowed = false;
      newGameState.effect = USER_WINS
      return { texts, features, game: newGameState }
    },

    [START]: () => {
      const newGameState = {
        ...storage.initialGameState,
        level: configs.startLevel,
        onGame: true,
        effect: READY_TO_NEW_LEVEL,
      }
      return { texts, features, game: newGameState }
    },

    [STOP]: () => {
      const message = payload.message || game.message
      const newGameState = {
        ...storage.initialGameState,
        message,
        effect: STOPPED,
        onGame: false,
        isClickAllowed: false
      }
      return { texts, features, game: newGameState }
    },

    [SET_MESSAGE]: () => {
      const { message } = payload
      const newGameState = { ...game, message, }
      return { texts, features, game: newGameState }
    },

    [ADD_NEW_COLOR]: () => {
      const { newColor } = payload
      const newGameState = {
        ...game,
        shuffledOrder: [...game.shuffledOrder, newColor],
        effect: READY_TO_TRIGGER_BUTTONS,
        isClickAllowed: false
      }
      return { texts, features, game: newGameState }
    },

    [GAME_PASSIVE]: () => {
      const newGameState = {
        ...game,
        effect: WAITING_FOR_USER_CLICKS,
        isClickAllowed: true
      }
      return { texts, features, game: newGameState }
    },

    [LOAD]: () => {
      const index = storage.textsStore.languages.findIndex(({ short }) => configs.currentLanguage === short)
      const newTexts = storage.textsStore.texts[index]
      const message = newTexts.wellcomeMessage
      const newGameState = { ...game, message }
      return { texts: newTexts, game: newGameState, features }
    },

    [CHANGE_LANGUAGE]: () => {
      const index = storage.textsStore.languages.findIndex(({ short }) => payload.lang === short)
      const newTexts = storage.textsStore.texts[index]

      let newMessage = ''
      if (game.message) {
        let textProp = null;
        for (let prop in texts) {
          if (texts[prop] === game.message) textProp = prop;
        };
        newMessage = newTexts[textProp]
      }

      const newGameState = { ...game, message: newMessage }

      return { texts: newTexts, game: newGameState, features }
    },
  };

  const newMutable = actions[type]();

  return { configs, storage, mutable: newMutable }
};

export default reducer