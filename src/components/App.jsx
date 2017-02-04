import React, {PropTypes} from 'react'

import config from '../config'
const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize
const NEXT_WIDTH = 5 * config.blockSize
const NEXT_HEIGHT = 5 * config.blockSize

import Scoreboard from './Scoreboard'
import Instructions from './Instructions'
import ConfigPanel from './ConfigPanel'
import NextPiece from './NextPiece'
import Message from './Message'

const App = props => (
  <div className='app'>
    <div className='scoreWrapper'>
      <Scoreboard level={props.level} score={props.score} lines={props.lines} />
      {config.showNextPiece ? <NextPiece piece={props.nextPiece} width={NEXT_WIDTH} height={NEXT_HEIGHT} /> : null}
      <ConfigPanel />
    </div>
    <div className='gameWrapper' style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}} >
      <canvas id='game' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <Message message={props.message} />
      <Instructions />
    </div>
  </div>
)

App.propTypes = {
  message: PropTypes.string,
  level: PropTypes.number,
  score: PropTypes.number,
  lines: PropTypes.number,
  nextPiece: PropTypes.object
}

export default App
