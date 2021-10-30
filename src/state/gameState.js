import { INITIAL } from './effectsTypes.js'

const gameState = {
  effect: INITIAL,
  onGame: false,
  shuffledOrder: [],
  round: 0,
  clickCount: 0,
  level: 0,
  score: 0,
  noteToTrigger: '',
  message: '',
  isClickAllowed: false,
  currentLevelOptions: {
    timeToTurnOff: 0,
    timeToResolve: 0,
    rounds: 0,
    pointsOnCorrectClick: 0,
    bonusForFinishedRound: 0,
    bonusForFinishedLevel: 0,
    roundedScoreOnLevelEnd: 0,
    buttons: [
    ]
  },
  currentLanguage: '',
  languages: [],
  texts: {},
};

export default gameState;
