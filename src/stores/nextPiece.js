import {REPLACE_STATE} from './index'

export const SET_NEXT_PIECE = 'SET_NEXT_PIECE'
export const setNextPiece = (piece) => ({
  type: SET_NEXT_PIECE,
  piece
})

export const clearNextPiece = () => setNextPiece(initialState)

const initialState = {
  name: '',
  matrix: [[0]],
  id: -1,
  color: 0
}

export default function reducer (previousPiece = initialState, action) {
  switch (action.type) {
    case REPLACE_STATE: return getNextPiece(action.payload)
    case SET_NEXT_PIECE:
      return action.piece
    default:
      return previousPiece
  }
}

export const getNextPiece = state => state.nextPiece
