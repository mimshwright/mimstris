import React, {PropTypes} from 'react'

import config from '../config'

import Scoreboard from './Scoreboard'
import Instructions from './Instructions'
import NextPiece from './NextPiece'
import Message from './Message'

const App = props => (
  <div className='app'>
    <div className='scoreWrapper'>
      <Scoreboard level={props.level} score={props.score} lines={props.lines} />
      {config.showNextPiece ? <NextPiece piece={props.nextPiece} width={100} height={120} /> : null}
    </div>
    <div className='gameWrapper '>
      <canvas id='game' width='240' height='400' />
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
