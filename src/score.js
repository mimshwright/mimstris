export default {
  score: 0,
  lines: 0,
  BASE_SCORE: 100,

  reset () {
    this.score = 0
    this.lines = 0
  },

  calculateScore (lines, level) {
    return this.BASE_SCORE * lines * lines * (level + 1)
  },

  increment (score, lines) {
    this.score += score
    this.lines += lines

    console.log('lines:', this.lines, 'score:', this.score)
  }
}
