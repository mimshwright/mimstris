import {createSelector} from 'reselect'
import config from '../config'
import {getLevel} from './level'

export const getFallRate = createSelector(
  getLevel,
  (level) => config.initialFallRate + (level * config.fallRateLevelModifier)
)
