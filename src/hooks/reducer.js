import { CLICK, START, STOP, SET_MESSAGE, ADD_NEW_COLOR, GAME_PASSIVE, LOAD, CHANGE_LANGUAGE, TURN_BUTTON_ON, TURN_BUTTON_OFF } from '../state/actionsTypes.js';
import {
  READY_TO_NEW_LEVEL, READY_TO_NEW_ROUND, READY_TO_TRIGGER_BUTTONS, GAME_OVER, USER_WINS, STOPPED, WAITING_FOR_USER_CLICKS, READY_TO_ATTACK_SOUND,
  READY_TO_RELEASE_SOUND,
} from '../state/effectsTypes.js'

function reducer(state, { type, payload = {} }) {

  const {
    configs,
    storage,
    mutable,
  } = state;

  const actions = {

    [CLICK]: () => {

      let newMutable = { ...mutable }

      // early return if user loses
      if (newMutable.shuffledOrder[newMutable.clickCount] !== payload.color) {
        newMutable.isClickAllowed = false;
        newMutable.effect = GAME_OVER;
        return { ...newMutable }
      }

      newMutable.clickCount++
      newMutable.score += newMutable.level * configs.maxTonesByLevel
      // early return if the last click is correct but the click section is not finished
      if (newMutable.clickCount !== newMutable.shuffledOrder.length) {
        return { ...newMutable }
      }

      newMutable.clickCount = 0
      newMutable.round++
      newMutable.isClickAllowed = false
      //early return if is new round but not new level
      if (newMutable.round < configs.maxTonesByLevel) {
        newMutable.effect = READY_TO_NEW_ROUND;
        return { ...newMutable }
      }

      newMutable.level++
      newMutable.round = 0
      newMutable.shuffledOrder = []
      const { buttons, timeToTurnOff, timeToResolve } = storage.levelInfos[newMutable.level - 1];
      const newButtons = buttons.map(button => ({ ...button, isLightOn: false }))
      newMutable.buttons = newButtons
      newMutable.timeToTurnOff = timeToTurnOff
      newMutable.timeToResolve = timeToResolve
      // early return if is new level
      if (newMutable.level < configs.maxLevel) {
        newMutable.effect = READY_TO_NEW_LEVEL
        return { ...newMutable }
      }

      // userwins
      newMutable.isClickAllowed = false;
      newMutable.effect = USER_WINS
      return { ...newMutable }
    },

    [TURN_BUTTON_ON]: () => {
      let noteToTrigger = ''
      const newButtons = mutable.buttons.map(button => {
        const newButton = { ...button }
        if (button.color === payload.color) {
          newButton.isLightOn = true
          noteToTrigger = button.note
        }

        return newButton
      })
      return { ...mutable, buttons: newButtons, effect: READY_TO_ATTACK_SOUND, noteToTrigger }
    },

    [TURN_BUTTON_OFF]: () => {
      const newButtons = mutable.buttons.map(button => {
        const newButton = { ...button }
        if (button.color === payload.color) newButton.isLightOn = false
        return newButton
      })
      return { ...mutable, buttons: newButtons, effect: READY_TO_RELEASE_SOUND }

    },

    [START]: () => {
      const newMutable = {
        ...mutable,
        shuffledOrder: [],
        round: 0,
        clickCount: 0,
        isClickAllowed: false,
        score: 0,
        message: '',
        level: configs.startLevel,
        onGame: true,
        effect: READY_TO_NEW_LEVEL,
      }
      return { ...newMutable }
    },

    [STOP]: () => {
      const message = payload.message || mutable.message
      const newMutable = {
        ...mutable,
        message,
        effect: STOPPED,
        onGame: false,
        isClickAllowed: false
      }
      return { ...newMutable }
    },

    [SET_MESSAGE]: () => {
      const { message } = payload
      const newMutable = { ...mutable, message, }
      return { ...newMutable }
    },

    [ADD_NEW_COLOR]: () => {
      const { newColor } = payload
      const newMutable = {
        ...mutable,
        shuffledOrder: [...mutable.shuffledOrder, newColor],
        effect: READY_TO_TRIGGER_BUTTONS,
        isClickAllowed: false
      }
      return { ...newMutable }
    },

    [GAME_PASSIVE]: () => {
      const newMutable = {
        ...mutable,
        effect: WAITING_FOR_USER_CLICKS,
        isClickAllowed: true
      }
      return { ...newMutable }
    },

    [LOAD]: () => {
      const index = storage.textStorage.languages.findIndex(({ short }) => configs.currentLanguage === short)
      const texts = storage.textStorage.texts[index]
      const message = texts.wellcomeMessage
      const { buttons, timeToTurnOff, timeToResolve } = storage.levelInfos[configs.startLevel - 1];
      const newButtons = buttons.map(button => ({ ...button, isLightOn: false }))
      const newMutable = { ...mutable, buttons: newButtons, texts, message, timeToTurnOff, timeToResolve, }
      return { ...newMutable }
    },

    [CHANGE_LANGUAGE]: () => {
      const index = storage.textStorage.languages.findIndex(({ short }) => payload.lang === short)
      const texts = storage.textStorage.texts[index]
      const message = mutable.onGame ? '' : texts.wellcomeMessage
      const newMutable = { ...mutable, message, texts }
      return { ...newMutable }
    },
  };

  const newMutable = actions[type]();

  return { configs, storage, mutable: newMutable }
};

export default reducer