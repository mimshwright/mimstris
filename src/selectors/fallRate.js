import {createSelector} from 'reselect'
import config from '../config'

const initialFallRate = state => config.initialFallRate
const fallRateLevelModifier = state => config.fallRateLevelModifier
const level = state => state.level

export const fallRate = createSelector(
  initialFallRate,
  fallRateLevelModifier,
  level,
  (initialFallRate, fallRateLevelModifier, level) => initialFallRate + level * fallRateLevelModifier
)
