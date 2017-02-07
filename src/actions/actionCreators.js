import * as actions from './actions'

export const resetScore = () => ({
  type: actions.RESET_SCORE
})

export const setScore = score => ({
  type: actions.SET_SCORE,
  score
})

export const incrementScore = score => ({
  type: actions.INCREMENT_SCORE,
  score
})

export const setLines = lines => ({
  type: actions.SET_LINES,
  lines
})

export const incrementLines = lines => ({
  type: actions.INCREMENT_LINES,
  lines
})

export const setLevel = level => ({
  type: actions.SET_LEVEL,
  level
})
