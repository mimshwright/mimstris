import {createSelector} from 'reselect'
import * as gameState from './gameState'

export const getMessage = createSelector(
  gameState.getGameState,
  (state) => {
    switch (state) {
      case gameState.GAME_STATE_PAUSED:
        return 'Paused'
      case gameState.GAME_STATE_GAME_OVER:
        return 'Game Over!'
      case gameState.GAME_STATE_RUNNING:
      default:
        return ''
    }
  }
)
