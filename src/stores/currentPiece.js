import _cloneDeep from 'lodash/fp/cloneDeep'
import {rotate, detectCollision, getMatrixWidth} from '../matrixUtil'

export const SET_CURRENT_PIECE = 'Set current piece'
export const setCurrentPiece = (piece) => ({
  type: SET_CURRENT_PIECE,
  piece
})

export const ROTATE_CURRENT_PIECE = 'Rotate Current Piece'
export const ROTATION_DIRECTION_RIGHT = 'right'
export const ROTATION_DIRECTION_LEFT = 'left'
export const rotateRight = (board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_RIGHT,
  board
})
export const rotateLeft = (board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_LEFT,
  board
})
export const rotateCurrentPiece = (direction, board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction,
  board
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
      const {board, direction} = action
      if (!board) {
        throw new Error("The action '" + action.type + "' must provide a value called 'board'.")
      }
      let newPiece = _cloneDeep(previousPiece)
      newPiece.matrix = rotate(newPiece.matrix, direction)
      const pieceWidth = getMatrixWidth(newPiece.matrix)

      // validate rotation. Attempt to fit the piece within the other
      // blocks around it. If it fails, cancel the rotation
      let offsetX = 1

      while (detectCollision(board, newPiece.matrix, newPiece.x, newPiece.y)) {
        newPiece.x += offsetX

        // flip direction and add one square after trying left and right
        if (offsetX > 0) {
          offsetX = -offsetX
        } else {
          offsetX = -offsetX + 1
        }

        if (Math.abs(offsetX) > Math.ceil(pieceWidth / 2)) {
          // validation failed. piece doesn't fit.
          return previousPiece
        }
      }
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
