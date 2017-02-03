import React, {PropTypes} from 'react'

const Scoreboard = props => (
  <div className='scoreboard'>
    <div id='level' />
    <div id='score' />
    <div id='lines' />
    <div id='next' />
  </div>
)

Scoreboard.propTypes = {
  level: PropTypes.number,
  score: PropTypes.number,
  lines: PropTypes.number,
  next: PropTypes.string
}

export default Scoreboard
