import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getNextPiece} from '../stores/nextPiece'

import Piece from '../components/Piece'

const mapStateToProps = (state) => ({
  piece: getNextPiece(state)
})

const NextPiece = (props) => (
  <div className='nextPiece'>
    <div>Next...</div>
    <Piece {...props} />
  </div>
)

Piece.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default connect(mapStateToProps)(NextPiece)
