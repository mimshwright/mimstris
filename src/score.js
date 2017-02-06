import {store} from './components/App'
import {setLines, setScore, incrementScore} from './actions/actionCreators'

export default {
  BASE_LINE_SCORE: 10,

  reset () {
    store.dispatch(setScore(0))
    store.dispatch(setLines(0))
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
    let action = incrementScore(score)
    store.dispatch(action)
    store.dispatch(setLines(store.getState().lines + lines))
    // console.log('lines:', this.lines, 'score:', this.score)
  }
}
