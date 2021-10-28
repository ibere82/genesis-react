import buttons from '../data/buttons.json';
import levelTimes from '../data/levelTimes.json';
import winMusic from '../data/winMusic.json';
import gameOverMusic from '../data/gameOverMusic.json';
import textsStore from '../data/textsStore.json'
import { INITIAL } from '../state/effectsTypes.js'

// configs
const MAX_TONES_BY_LEVEL = 2;
const START_LEVEL = 1;
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

const currentGameState = { ...initialGameState }

const configs = {
  maxTonesByLevel: MAX_TONES_BY_LEVEL,
  startLevel: START_LEVEL,
  maxLevel: MAX_LEVEL,
  levelTimes,
  buttons,
}

const texts = {
  topMessages: {
    wellcomeMessage: "",
    nextLevelMessage: "",
    abortedGameMessage: "",
    gameOverMessage: "",
    winMessages: []
  },
  labels: {
    levelLabel: "",
    scoreLabel: "",
    startGameButtonLabel: "",
    stopGameButtonLabel: ""
  }
};

const data = {
  winMusic,
  textsStore,
  gameOverMusic,
}

const options = {
  currentLanguage: 'pt'
}

const appState = {
  configs,
  data,
  initialGameState,
  currentGameState,
  options,
  texts,
}

export default appState
