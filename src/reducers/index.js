import { combineReducers } from 'redux'
import _merge from 'lodash/fp/merge'
import * as gameMetrics from './gameMetrics'

export default combineReducers(
  _merge(
    {},
    gameMetrics
  )
)
