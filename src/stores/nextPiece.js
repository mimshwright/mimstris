export const SET_NEXT_PIECE = 'Set next piece'
export const setNextPiece = (piece) => ({
  type: SET_NEXT_PIECE,
  piece
})

const initialState = null

export default function reducer (previousPiece = initialState, action) {
  switch (action.type) {
    case SET_NEXT_PIECE:
      return action.piece
    default:
      return previousPiece
  }
}

export const getNextPiece = state => state.nextPiece
