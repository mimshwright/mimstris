import merge from 'lodash/merge'

export const TOGGLE_SHOW_NEXT_PIECE = 'TOGGLE_SHOW_NEXT_PIECE'
export const toggleShowNextPiece = () => ({
  type: TOGGLE_SHOW_NEXT_PIECE
})
export const getShowNextPiece = (state) => state.config.showNextPiece

const initialState = {
  showNextPiece: true
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW_NEXT_PIECE:
      return merge(state, {showNextPiece: !state.showNextPiece})
    default:
      return state
  }
}
