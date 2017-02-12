import {RESET_SCORE} from './score'

// acitons
export const SET_LINES = 'Set lines'
export const setLines = lines => ({
  type: SET_LINES,
  lines
})

export const INCREMENT_LINES = 'Increment lines'
export const incrementLines = lines => ({
  type: INCREMENT_LINES,
  lines
})

// state
const initialState = 0

// reducer
export default function reducer (previousLines = initialState, action) {
  switch (action.type) {
    case RESET_SCORE:
      return 0
    case SET_LINES:
      return action.lines
    case INCREMENT_LINES:
      return action.lines + previousLines
    default:
      return previousLines
  }
}

// selectors
export const getLines = state => state.lines
