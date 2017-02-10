import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'

import Scoreboard from '../containers/Scoreboard'
import StatusMessage from '../containers/StatusMessage'
import NextPiece from '../containers/NextPiece'
import Instructions from './Instructions'
import ConfigPanel from './ConfigPanel'

import config from '../config'

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize
const NEXT_WIDTH = 5 * config.blockSize
const NEXT_HEIGHT = 5 * config.blockSize

const App = props => (
  <Provider store={store}>
    <div className='app'>
      <div className='scoreWrapper'>
        <Scoreboard />
        {config.showNextPiece ? <NextPiece width={NEXT_WIDTH} height={NEXT_HEIGHT} /> : null}
        <ConfigPanel />
      </div>
      <div className='gameWrapper' style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}} >
        <canvas id='game' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <StatusMessage />
        <Instructions />
      </div>
    </div>
  </Provider>
)

App.propTypes = {
}

export default App
