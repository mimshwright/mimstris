import { combineReducers } from 'redux'

import score from './score'
import lines from './lines'
import message from './message'
import nextPiece from './nextPiece'
import currentPiece from './currentPiece'
// import fallRate from './fallRate'
// import level from './level'

export default combineReducers(
  {score, lines, message, nextPiece, currentPiece}
)
