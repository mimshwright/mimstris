import React from "react";
import { connect } from "react-redux";
import { getCurrentPiece } from "../stores/currentPiece.js";
import { getBoard } from "../stores/board.js";

import GameCanvas from "../components/GameCanvas";

const mapStateToProps = (state) => ({
  currentPiece: getCurrentPiece(state),
  board: getBoard(state),
});

const Game = (props) => <GameCanvas {...props} />;

export default connect(mapStateToProps)(Game);
