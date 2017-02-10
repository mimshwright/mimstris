import * as actions from '../actions'

export const nextPiece = (previousPiece = null, action) => {
  switch (action.type) {
    case actions.SET_NEXT_PIECE:
      return action.piece
    default:
      return previousPiece
  }
}
