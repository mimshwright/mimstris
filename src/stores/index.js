import { combineReducers, createStore } from "redux";

import score from "./score.js";
import lines from "./lines.js";
import nextPiece from "./nextPiece.js";
import currentPiece from "./currentPiece.js";
import board from "./board.js";
import config from "./config.js";
import gameState from "./gameState.js";
// selector-only modules
// import message from './message'
// import fallRate from './fallRate'
// import level from './level'

export const reducer = combineReducers({
  score,
  lines,
  nextPiece,
  currentPiece,
  board,
  gameState,
  config,
});

// const window = window || undefined
// const devTools = window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
  reducer
  // To trigger dev tools in browser extension
  // devTools
);
