import React, {PropTypes} from 'react'
import canvasRenderer from '../canvasRenderer'
import config from '../config'

class NextPiece extends React.Component {
  componentDidUpdate () {
    const canvas = this.refs.canvas
    if (canvas) {
      const context = canvas.getContext('2d')
      canvasRenderer.clearCanvas(context, config.htmlBackgroundColor)
      canvasRenderer.drawMatrix(context, this.props.piece.matrix, 1, 1)
    }
  }

  render () {
    return (
      <div className='nextPiece'>
        <p>Next...</p>
        <canvas ref='canvas' width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}

NextPiece.propTypes = {
  piece: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
}

export default NextPiece
