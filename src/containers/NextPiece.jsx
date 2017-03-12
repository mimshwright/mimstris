import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getNextPiece} from '../stores/nextPiece'
import {getShowNextPiece} from '../stores/config'

import Piece from '../components/Piece'

const mapStateToProps = (state) => ({
  piece: getNextPiece(state),
  showNextPiece: getShowNextPiece(state)
})

const NextPiece = (props) => {
  const visibility = props.showNextPiece ? 'visible' : 'hidden'
  const style = {visibility: visibility}

  return <div className='nextPiece' style={style}>
    <div>Next...</div>
    <Piece {...props} />
  </div>
}

Piece.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default connect(mapStateToProps)(NextPiece)
