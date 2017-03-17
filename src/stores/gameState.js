import {REPLACE_STATE} from './index'

export const SET_GAME_STATE = 'SET_GAME_STATE'
export const setGameState = state => ({
  type: SET_GAME_STATE,
  state
})

export const GAME_STATE_PAUSED = 'paused'
export const GAME_STATE_GAME_OVER = 'game over'
export const GAME_STATE_RUNNING = 'running'
const initialState = GAME_STATE_RUNNING

export default function reducer (previousState = initialState, action) {
  switch (action.type) {
    case REPLACE_STATE: return getGameState(action.payload)
    case SET_GAME_STATE:
      return action.state
    default:
      return previousState
  }
}

export const getGameState = state => state.gameState
