export const SET_SCORE = 'Set score'
export const INCREMENT_SCORE = 'Increment score'
export const ADD_PIECE_SCORE = 'Add piece score'
export const ADD_CLEARED_LINE_SCORE = 'Add cleared line score'
export const SET_LINES = 'Set lines'
export const INCREMENT_LINES = 'Increment lines'
export const RESET_SCORE = 'Reset score'
export const CLEAR_MESSAGE = 'Clear message'
export const SET_MESSAGE = 'Set message'

export const addPieceScore = (level) => ({
  type: ADD_PIECE_SCORE,
  level
})

export const addClearedLineScore = (lines, level) => ({
  type: ADD_CLEARED_LINE_SCORE,
  lines,
  level
})

export const resetScore = () => ({
  type: RESET_SCORE
})

export const setScore = score => ({
  type: SET_SCORE,
  score
})

export const incrementScore = score => ({
  type: INCREMENT_SCORE,
  score
})

export const setLines = lines => ({
  type: SET_LINES,
  lines
})

export const incrementLines = lines => ({
  type: INCREMENT_LINES,
  lines
})

export const clearMessage = () => ({ type: CLEAR_MESSAGE })

export const setMessage = message => ({ type: SET_MESSAGE, message })
