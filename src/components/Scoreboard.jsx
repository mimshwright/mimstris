import React, {PropTypes} from 'react'

const Scoreboard = props => (
  <div className='scoreboard'>
    <div className='scoreboardText' id='level'>Level: {props.level}</div>
    <div className='scoreboardText' id='score'>Score: {props.score}</div>
    <div className='scoreboardText' id='lines'>Lines: {props.lines}</div>
  </div>
)

Scoreboard.propTypes = {
  level: PropTypes.number,
  score: PropTypes.number,
  lines: PropTypes.number
}

export default Scoreboard
