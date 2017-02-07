import {combineReducers} from 'redux'
import * as actions from '../actions/actions'

const score = (previousScore = 0, {type, score = 0}) => {
  switch (type) {
    case actions.RESET_SCORE:
      return 0
    case actions.SET_SCORE:
      return score
    case actions.INCREMENT_SCORE:
      return score + previousScore
    default:
      return previousScore
  }
}

const lines = (previousLines = 0, {type, lines = 0}) => {
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

const level = (previousLevel = 0, {type, level = 0}) => {
  switch (type) {
    case actions.RESET_SCORE:
      return 0
    case actions.SET_LEVEL:
      return level
    default:
      return previousLevel
  }
}

export default combineReducers(
  {
    score,
    lines,
    level
  }
)
