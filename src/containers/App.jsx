import React from 'react'
import { Provider } from 'react-redux'
import store from '../stores'
import config from '../config'

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
        <Game width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <StatusMessage />
        <Instructions />
      </div>
    </div>
  </Provider>
)

export default App
