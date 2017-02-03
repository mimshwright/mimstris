import React, {PropTypes} from 'react'

const Scoreboard = props => (
  <div className='scoreboard'>
    <div id='level'>Level: {props.level}</div>
    <div id='score'>Score: {props.score}</div>
    <div id='lines'>Lines: {props.lines}</div>
  </div>
)

Scoreboard.propTypes = {
  level: PropTypes.number,
  score: PropTypes.number,
  lines: PropTypes.number
}

export default Scoreboard
