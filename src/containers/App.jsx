import React from "react";
import { connect } from "react-redux";
import config from "../config.js";
import { undoLastPiece } from "../stores/history.js";
import {
  getGameState,
  GAME_STATE_PAUSED,
  GAME_STATE_INIT,
} from "../stores/gameState.js";
import { getPlayMusic } from "../stores/config.js";

import Game from "./Game";
import Scoreboard from "./Scoreboard";
import StatusMessage from "./StatusMessage";
import NextPiece from "./NextPiece";
import ConfigPanel from "./ConfigPanel";
import Music from "./Music";

import Instructions from "../components/Instructions";

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize;
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize;
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize;
const NEXT_WIDTH = 5 * config.blockSize;
const NEXT_HEIGHT = 7 * config.blockSize;

const mapStateToProps = (state) => ({
  musicPlaying:
    getPlayMusic(state) &&
    getGameState(state) !== GAME_STATE_INIT &&
    getGameState(state) !== GAME_STATE_PAUSED,
});

const mapDispatchToProps = (dispatch) => ({
  onUndoClick: () => {
    dispatch(undoLastPiece());
  },
});

const App = (props) => (
  <div className="app">
    <div className="scoreWrapper">
      <Scoreboard />
      <NextPiece width={NEXT_WIDTH} height={NEXT_HEIGHT} />
      {config.allowUndo ? (
        <button className="undoButton" onClick={props.onUndoClick}>
          Undo
        </button>
      ) : null}
      <ConfigPanel />
    </div>
    <div
      className="gameWrapper"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      <Game width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <StatusMessage />
      <Instructions />
      <Music isPlaying={props.musicPlaying} />
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
