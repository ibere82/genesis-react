import buttons from '../data/buttons.json';
import levelInfos from '../data/levelInfos.json';
import winMusic from '../data/winMusic.json';
import gameOverMusic from '../data/gameOverMusic.json';
import textStorage from '../data/textStorage.json'
import { INITIAL } from '../state/effectsTypes.js'

// configs
const MAX_TONES_BY_LEVEL = 2;
const START_LEVEL = 1;
const MAX_LEVEL = levelInfos.length;

const initialGameState = {
  effect: INITIAL,
  onGame: false,
  shuffledOrder: [],
  round: 0,
  clickCount: 0,
  isClickAllowed: false,
  level: 0,
  score: 0,
  message: '',
}

const configs = {
  maxTonesByLevel: MAX_TONES_BY_LEVEL,
  startLevel: START_LEVEL,
  maxLevel: MAX_LEVEL,
  defaultLanguage: 'pt',
  currentLanguage: 'pt',
}

const appState = {
  mutable: {
    ...initialGameState,
    noteToTrigger: '',
    message: '',
    isClickAllowed: false,
    buttons: [

    ],
    timeToTurnOff: null,
    timeToResolve: null,
    currentLanguage: '',
    languages: textStorage.languages,
    texts: {},
    levelInfos,
    winMusic,
    gameOverMusic,
  },

  configs: {
    ...configs
  },

  storage: {
    textStorage,
    levelInfos,
    buttons,
  }
}

export default appState
