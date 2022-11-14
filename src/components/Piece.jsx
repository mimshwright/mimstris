import React from "react";
import canvasRenderer from "../canvasRenderer.js";
import config from "../config.js";

class Piece extends React.Component {
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
      canvasRenderer.clearCanvas(context, config.htmlBackgroundColor);
      canvasRenderer.drawMatrix(context, this.props.piece.matrix, 1, 1);
    }
  }

  render() {
    return (
      <div
        className="piece"
        style={{ width: this.props.width, height: this.props.height }}
      >
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.piece.name}
        </canvas>
      </div>
    );
  }
}

export default Piece;
