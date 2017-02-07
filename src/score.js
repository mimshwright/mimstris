import {store} from './components/App'
import {resetScore, incrementScore, incrementLines} from './actions/actionCreators'

export default {
  BASE_LINE_SCORE: 10,

  reset () {
    store.dispatch(resetScore())
  },

  addPieceScore (level) {
    this.increment(this.calculatePieceScore(level))
  },

  addLineClearedScore (clearedLines, level) {
    this.increment(this.calculateLineScore(clearedLines, level), clearedLines)
  },

  calculateLineScore (lines, level) {
    return this.BASE_LINE_SCORE * lines * lines * (level + 1)
  },

  calculatePieceScore (level) {
    return Math.pow(2, level)
  },

  increment (score = 0, lines = 0) {
    if (score !== 0) {
      store.dispatch(incrementScore(score))
    }
    if (lines !== 0) {
      store.dispatch(incrementLines(lines))
    }
    // console.log('lines:', this.lines, 'score:', this.score)
  }
}
