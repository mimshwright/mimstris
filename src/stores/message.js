import { createSelector } from "reselect";
import * as gameState from "./gameState.js";

export const getMessage = createSelector(gameState.getGameState, (state) => {
  switch (state) {
    case gameState.GAME_STATE_PAUSED:
      return { text: "Paused", subtext: "Press ENTER to continue" };
    case gameState.GAME_STATE_GAME_OVER:
      return { text: "Game Over!", subtext: "Press ENTER to start a new game" };
    case gameState.GAME_STATE_RUNNING:
      return { text: "", subtext: "" };
    case gameState.GAME_STATE_INIT:
    default:
      return { text: "Mimstris", subtext: "Press ENTER to start a new game" };
  }
});
