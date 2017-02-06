import { combineReducers } from 'redux'
import score from './score'
import lines from './lines'

export default combineReducers(
  {
    score,
    lines
  }
)
