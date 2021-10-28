import buttons from '../data/buttons.json';
import levelTimes from '../data/levelTimes.json';
import winMusic from '../data/winMusic.json';
import gameOverMusic from '../data/gameOverMusic.json';
import textsStore from '../data/textsStore.json'
import { INITIAL } from '../state/effectsTypes.js'

// configs
const MAX_TONES_BY_LEVEL = 2;
const START_LEVEL = 8;
const MAX_LEVEL = levelTimes.length;

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
  currentLanguage: 'pt'
}

const appState = {
  mutable: {
    game: { ...initialGameState },
    texts: {
      wellcomeMessage: "",
      nextLevelMessage: "",
      abortedGameMessage: "",
      gameOverMessage: "",
      winMessages: [],
      levelLabel: "",
      scoreLabel: "",
      startGameButtonLabel: "",
      stopGameButtonLabel: ""
    },
    features: {
      timeToTurnOff: null,
      timeToResolve: null,
      levelTimes,
      buttons,
      winMusic,
      gameOverMusic,
      languages: textsStore.languages,
    }
  },

  configs: {
    ...configs
  },

  storage: {
    textsStore,
    levelTimes,
    buttons,
    initialGameState,
  }
}

export default appState
