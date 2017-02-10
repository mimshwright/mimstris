import { combineReducers } from 'redux'
import * as gameMetrics from './gameMetrics'
import * as message from './message'
import * as nextPiece from './nextPiece'

export default combineReducers(
  Object.assign(
    message,
    gameMetrics,
    nextPiece
  )
)
