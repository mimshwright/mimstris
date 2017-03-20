import config from '../config'
import merge from 'lodash/merge'
import {REPLACE_STATE} from './index'

export const getConfig = (state) => state.config

export const TOGGLE_PLAY_MUSIC = 'TOGGLE_PLAY_MUSIC'
export const togglePlayMusic = () => ({
  type: TOGGLE_PLAY_MUSIC
})
export const getPlayMusic = (state) => getConfig(state).playMusic

export const TOGGLE_SHOW_NEXT_PIECE = 'TOGGLE_SHOW_NEXT_PIECE'
export const toggleShowNextPiece = () => ({
  type: TOGGLE_SHOW_NEXT_PIECE
})
export const getShowNextPiece = (state) => getConfig(state).showNextPiece

export const TOGGLE_MIDNIGHT_MODE = 'TOGGLE_MIDNIGHT_MODE'
export const toggleMidnightMode = () => ({
  type: TOGGLE_MIDNIGHT_MODE
})
export const getMidnightMode = (state) => getConfig(state).midnightMode

export const TOGGLE_DETERMINISTIC_MODE = 'TOGGLE_DETERMINISTIC_MODE'
export const toggleDeterministicMode = () => ({
  type: TOGGLE_DETERMINISTIC_MODE
})
export const getDeterministicMode = (state) => getConfig(state).deterministicMode

export const SET_ACTIVE_PIECES = 'SET_ACTIVE_PIECES'
export const setActivePieces = (pieces) => ({
  type: SET_ACTIVE_PIECES,
  payload: pieces
})
export const getActivePieces = (state) => getConfig(state).activePieces

const initialState = {
  showNextPiece: config.showNextPiece,
  midnightMode: config.midnightMode,
  deterministicMode: config.deterministicMode,
  activePieces: config.activePieces,
  playMusic: config.playMusic
}

const toggle = (state, key) => merge({}, state, {[key]: !state[key]})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REPLACE_STATE: return getConfig(action.payload)
    case TOGGLE_SHOW_NEXT_PIECE:
      return toggle(state, 'showNextPiece')
    case TOGGLE_PLAY_MUSIC:
      return toggle(state, 'playMusic')
    case TOGGLE_MIDNIGHT_MODE:
      return toggle(state, 'midnightMode')
    case TOGGLE_DETERMINISTIC_MODE:
      return toggle(state, 'deterministicMode')
    case SET_ACTIVE_PIECES:
      return merge({}, state, { activePieces: action.payload })
    default:
      return state
  }
}
