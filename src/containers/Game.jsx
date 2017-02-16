import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getCurrentPiece} from '../stores/currentPiece'
import {getBoard} from '../stores/board'

import GameCanvas from '../components/GameCanvas'

const mapStateToProps = (state) => ({
  currentPiece: getCurrentPiece(state),
  board: getBoard(state)
})

const Game = (props) => (
  <GameCanvas {...props} />
)

Game.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Game)
