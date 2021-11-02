
const gameState = {
  onGame: false,
  gameNumber: 0,
  shuffledOrder: [],
  round: null,
  clickCount: null,
  level: null,
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
  gameOver: false,
  userWins: false,
};

export default gameState;
