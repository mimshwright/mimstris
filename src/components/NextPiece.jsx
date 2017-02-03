import React, {PropTypes} from 'react'
import canvasRenderer from '../canvasRenderer'

class NextPiece extends React.Component {
  componentDidUpdate () {
    const canvas = this.refs.canvas
    if (canvas) {
      const context = canvas.getContext('2d')
      canvasRenderer.clearCanvas(context)
      canvasRenderer.drawPiece(context, this.props.piece)
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
