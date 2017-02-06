import * as actions from './actions'

export const setScore = newScore => ({
  type: actions.SET_SCORE,
  score: newScore
})

export const incrementScore = score => ({
  type: actions.INCREMENT_SCORE,
  incrementScoreBy: score
})

export const setLines = newLines => ({
  type: actions.SET_LINES,
  lines: newLines
})
