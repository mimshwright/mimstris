import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Piece from '../components/Piece'

const mapStateToProps = (state) => ({
  piece: state.nextPiece
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
