export default {
  score: 0,
  lines: 0,
  BASE_LINE_SCORE: 10,

  reset () {
    this.score = 0
    this.lines = 0
  },

  calculateLineScore (lines, level) {
    return this.BASE_LINE_SCORE * lines * lines * (level + 1)
  },

  calculatePieceScore (level) {
    return Math.pow(2, level)
  },

  increment (score = 0, lines = 0) {
    this.score += score
    this.lines += lines
    // console.log('lines:', this.lines, 'score:', this.score)
  }
}
