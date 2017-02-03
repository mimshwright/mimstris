export default {
  startLevel: 0,
  newLevelEvery: 10,

  boardSize: [12, 20],
  blockSize: 28,

  // Falling rate should be expressed in steps per second.
  initialFallRate: 1,
  // This number is added to the fall rate on each new level
  fallRateLevelModifier: 0.333,
  // When holding down a key, you will move this many times per second.
  lateralMovementRate: 6,
  downMovementRate: 20,

  htmlBackgroundColor: '#371B52',
  backgroundColor: '#00263F',
  guideColor: '#021c2d',

  // When true, blocks fall all the way down instantly when you press down.
  instantDown: false,
  drawGuideLines: true,
  outlinePieces: true,
  outlineThickness: 0.08, // %
  showNextPiece: true,

  midnightMode: false
}
