import React, {PropTypes} from 'react'

import Scoreboard from './Scoreboard'
import Instructions from './Instructions'
import NextPiece from './NextPiece'
import Message from './Message'

const App = props => (
  <div>
    <Scoreboard level={props.level} score={props.score} lines={props.lines} />
    <NextPiece piece={props.nextPiece} width={80} height={80} />
    <div className='game-wrapper '>
      <canvas id='game' width='240' height='400' />
      <Message message={props.message} />
    </div>

    <Instructions />
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
