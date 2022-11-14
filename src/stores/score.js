import { REPLACE_STATE } from "./replaceState.js";

// Actions
export const ADD_PIECE_SCORE = "ADD_PIECE_SCORE";
export const addPieceScore = (level) => ({
  type: ADD_PIECE_SCORE,
  level,
});

export const ADD_CLEARED_LINE_SCORE = "ADD_CLEARED_LINE_SCORE";
export const addClearedLineScore = (lines, level) => ({
  type: ADD_CLEARED_LINE_SCORE,
  lines,
  level,
});

export const RESET_SCORE = "RESET_SCORE";
export const resetScore = () => ({
  type: RESET_SCORE,
});

// State
const initialState = 0;
const BASE_LINE_SCORE = 10;

// Reducer
export default function reducer(previousScore = 0, action) {
  const { lines, level } = action;

  switch (action.type) {
    case REPLACE_STATE:
      return getScore(action.payload);
    case RESET_SCORE:
      return 0;
    case ADD_PIECE_SCORE:
      return previousScore + (level + 1);
    case ADD_CLEARED_LINE_SCORE:
      const additionalScore = BASE_LINE_SCORE * lines * lines * (level + 1);
      return previousScore + additionalScore;
    default:
      return previousScore;
  }
}

// Selectors
export const getScore = (state) => state.score;
