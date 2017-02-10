import { combineReducers } from 'redux'
import _merge from 'lodash/fp/merge'
import * as gameMetrics from './gameMetrics'
import * as message from './message'

export default combineReducers(
  _merge(message)(gameMetrics)
)
