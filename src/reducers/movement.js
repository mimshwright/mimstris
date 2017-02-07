import * as actions from '../actions'
import config from '../config'

// Rate of pieces falling in steps down per second
export const fallRate = (previousFallRate = config.initialFallRate, {type, fallRate}) => {
  switch (type) {
    case actions.RESET_FALL_RATE:
      return config.initialFallRate
    case actions.SET_FALL_RATE:
      return fallRate
    default:
      return previousFallRate
  }
}
