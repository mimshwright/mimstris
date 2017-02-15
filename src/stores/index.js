import { combineReducers } from 'redux'

import score from './score'
import lines from './lines'
import nextPiece from './nextPiece'
import currentPiece from './currentPiece'
import gameState from './gameState'
// selector-only modules
// import message from './message'
// import fallRate from './fallRate'
// import level from './level'

export default combineReducers(
  {score, lines, nextPiece, currentPiece, gameState}
)
