import _cloneDeep from 'lodash/fp/cloneDeep'

import {createEmptyMatrix, removeRowAndShiftRemaining, combineMatrices, getFullRows} from '../matrixUtil'
import config from '../config'
import {REPLACE_STATE} from './index'

export const RESET_BOARD = 'RESET_BOARD'
export const resetBoard = () => ({
  type: RESET_BOARD
})

export const CLEAR_COMPLETED_LINES = 'CLEAR_COMPLETED_LINES'
export const clearCompletedLines = () => ({
  type: CLEAR_COMPLETED_LINES
})

export const MERGE_PIECE_INTO_BOARD = 'MERGE_PIECE_INTO_BOARD'
export const mergePieceIntoBoard = (piece) => ({
  type: MERGE_PIECE_INTO_BOARD,
  piece
})

const initialState = [[0]]

export default function reducer (previousBoard = initialState, action) {
  switch (action.type) {
    case REPLACE_STATE: return getBoard(action.payload)
    case RESET_BOARD:
      const emptyBoard = createEmptyMatrix(...config.boardSize)
      return emptyBoard
    case CLEAR_COMPLETED_LINES:
      let newBoard = _cloneDeep(previousBoard)
      let fullRowIndeces = getFullRows(newBoard)

      newBoard = fullRowIndeces.reduce(
        (board, rowIndex) => removeRowAndShiftRemaining(board, rowIndex)
      , newBoard)
      return newBoard
    case MERGE_PIECE_INTO_BOARD:
      const {piece} = action
      const {matrix, x, y} = piece
      const mergedBoard = combineMatrices(previousBoard, matrix, x, y, false)
      return mergedBoard
    default:
      return previousBoard
  }
}

export const getBoard = state => state.board
