export default {
  startLevel: 0,
  newLevelEvery: 10,

  // Falling rate should be expressed in steps per second.
  initialFallRate: 1,
  // This number is added to the fall rate on each new level
  fallRateLevelModifier: 0.333,
  // When holding down a key, you will move this many times per second.
  lateralMovementRate: 6,
  downMovementRate: 20,

  // When true, blocks fall all the way down instantly when you press down.
  instantDown: false,
  drawGuideLines: true,
  outlinePieces: true
}
