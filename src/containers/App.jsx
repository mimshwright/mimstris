import React from 'react'
import { connect } from 'react-redux'
import config from '../config'
import {undoLastPiece} from '../stores/history'

import Game from './Game'
import Scoreboard from './Scoreboard'
import StatusMessage from './StatusMessage'
import NextPiece from './NextPiece'
import Instructions from '../components/Instructions'
import ConfigPanel from './ConfigPanel'

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize
const NEXT_WIDTH = 5 * config.blockSize
const NEXT_HEIGHT = 7 * config.blockSize

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onUndoClick: () => { dispatch(undoLastPiece()) }
})

const App = props => (
  <div className='app'>
    <div className='scoreWrapper'>
      <Scoreboard />
      <NextPiece width={NEXT_WIDTH} height={NEXT_HEIGHT} />
      {config.allowUndo
          ? <button className='undoButton' onClick={props.onUndoClick}>Undo</button>
          : null
        }
      <ConfigPanel />
    </div>
    <div className='gameWrapper' style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}} >
      <Game width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <StatusMessage />
      <Instructions />
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
