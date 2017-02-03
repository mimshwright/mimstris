import React, {PropTypes} from 'react'

import Scoreboard from './Scoreboard'
import Instructions from './Instructions'
import Message from './Message'

const App = props => (
  <div>
    <Scoreboard level={props.level} score={props.score} lines={props.lines} next={props.next} />
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
  next: PropTypes.string
}

export default App
