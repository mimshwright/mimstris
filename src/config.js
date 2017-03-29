export default {
  startLevel: 0,
  newLevelEvery: 10,

  boardSize: [12, 20],
  blockSize: 28,

  // Falling rate should be expressed in steps per second.
  initialFallRate: 1,
  // This number is added to the fall rate on each new level
  fallRateLevelModifier: 0.5,
  // When holding down a key, you will move this many times per second.
  lateralMovementRate: 6,
  downMovementRate: 20,
  pauseRate: 2,

  playMusic: true,

  htmlBackgroundColor: '#371B52',
  backgroundColor: '#00263F',
  guideColor: '#021c2d',

  // When true, blocks fall all the way down instantly when you press down.
  instantDown: false,
  showGuideLines: true,
  outlinePieces: true,
  showBlockHighlight: true,
  outlineThickness: 0.08, // %
  showNextPiece: true,

  allowUndo: true,

  activePieces: 'TOJLISZ', // Standard set: 'TOJLISZ', extended set: 'UYHXP|[]'

  // When true, random blocks will be in an identical order every game.
  deterministicMode: false,
  // Changing this value will change the random blocks generated.
  randomSeed: 'seed',

  // Draws the blocks as teeny lights on dark background
  midnightMode: false
}
