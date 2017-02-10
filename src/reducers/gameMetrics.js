import * as actions from '../actions'

const BASE_LINE_SCORE = 10

export const score = (previousScore = 0, {type, level, lines, score = 0}) => {
  switch (type) {
    case actions.RESET_SCORE:
      return 0
    case actions.SET_SCORE:
      return score
    case actions.ADD_PIECE_SCORE:
      return previousScore + (level + 1)
    case actions.ADD_CLEARED_LINE_SCORE:
      const additionalScore = BASE_LINE_SCORE * lines * lines * (level + 1)
      return previousScore + additionalScore
    case actions.INCREMENT_SCORE:
      return score + previousScore
    default:
      return previousScore
  }
}

export const lines = (previousLines = 0, {type, lines = 0}) => {
  switch (type) {
    case actions.RESET_SCORE:
      return 0
    case actions.SET_LINES:
      return lines
    case actions.INCREMENT_LINES:
      return lines + previousLines
    default:
      return previousLines
  }
}
