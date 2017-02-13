import _cloneDeep from 'lodash/fp/cloneDeep'
import {rotate} from '../matrixUtil'

export const SET_CURRENT_PIECE = 'Set current piece'
export const setCurrentPiece = (piece) => ({
  type: SET_CURRENT_PIECE,
  piece
})

export const ROTATE_CURRENT_PIECE = 'Rotate Current Piece'
export const ROTATION_DIRECTION_RIGHT = 'right'
export const ROTATION_DIRECTION_LEFT = 'left'
export const rotateRight = () => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_RIGHT
})
export const rotateLeft = () => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_LEFT
})
export const rotateCurrentPiece = (direction) => ({
  type: ROTATE_CURRENT_PIECE,
  direction
})

export const SET_X = 'Set x'
export const setX = x => ({
  type: SET_X,
  x
})

const initialState = null

export default function reducer (previousPiece = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PIECE:
      return action.piece
    case ROTATE_CURRENT_PIECE:
      let newPiece = _cloneDeep(previousPiece)
      newPiece.matrix = rotate(previousPiece.matrix, action.direction)
      return newPiece
    case SET_X:
      let piece = _cloneDeep(previousPiece)
      piece.x = action.x
      return piece
    default:
      return previousPiece
  }
}

export const getCurrentPiece = state => state.currentPiece
