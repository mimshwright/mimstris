import React from "react";
import canvasRenderer from "../canvasRenderer.js";
import { combineMatrices } from "../matrixUtil.js";

class GameCanvas extends React.Component {
  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const canvas = this.refs.canvas;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (!this.frameRequest) {
        this.frameRequest = window.requestAnimationFrame(() => {
          canvasRenderer.drawGame(
            context,
            this.props.board,
            this.props.currentPiece
          );
          this.frameRequest = undefined;
        });
      }
    }
  }

  render() {
    return (
      <canvas
        ref="canvas"
        id="game"
        width={this.props.width}
        height={this.props.height}
      >
        {combineMatrices(this.props.board, this.props.currentPiece.matrix).map(
          (row, y) => "| " + row.join(" ") + " |"
        )}
      </canvas>
    );
  }
}

export default GameCanvas;
