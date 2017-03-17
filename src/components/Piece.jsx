import React, {PropTypes} from 'react'
import canvasRenderer from '../canvasRenderer'
import config from '../config'

class Piece extends React.Component {
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
      canvasRenderer.clearCanvas(context, config.htmlBackgroundColor)
      canvasRenderer.drawMatrix(context, this.props.piece.matrix, 1, 1)
    }
  }

  render () {
    return (
      <div className='piece' style={{width: this.props.width, height: this.props.height}}>
        <canvas ref='canvas' width={this.props.width} height={this.props.height} >
          {this.props.piece.name}
        </canvas>
      </div>
    )
  }
}

Piece.propTypes = {
  piece: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Piece
