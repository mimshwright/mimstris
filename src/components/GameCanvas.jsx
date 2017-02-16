import React, {PropTypes} from 'react'
import canvasRenderer from '../canvasRenderer'
import {combineMatrices} from '../matrixUtil'

class GameCanvas extends React.Component {
  componentDidMount () {
    this.drawCanvas()
  }

  componentDidUpdate () {
    this.drawCanvas()
  }

  drawCanvas () {
    const canvas = this.refs.canvas
    if (canvas) {
      const context = canvas.getContext('2d')
      canvasRenderer.drawGame(context, this.props.board, this.props.currentPiece)
    }
  }

  render () {
    return (
      <canvas ref='canvas' id='game' width={this.props.width} height={this.props.height}>
        {
          combineMatrices(this.props.board, this.props.currentPiece.matrix).map((row, y) => ('| ' + row.join(' ') + ' |'))
        }
      </canvas>
    )
  }
}

GameCanvas.propTypes = {
  currentPiece: PropTypes.object.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}
export default GameCanvas
