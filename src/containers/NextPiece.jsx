import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Piece from '../components/Piece'

const mapStateToProps = (state) => ({
  piece: state.nextPiece
})

const NextPiece = ({piece, width, height}) => (
  <div className='nextPiece'>
    <div>Next...</div>
    <Piece piece={piece} width={width} height={height} />
  </div>
)

Piece.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default connect(mapStateToProps)(NextPiece)
