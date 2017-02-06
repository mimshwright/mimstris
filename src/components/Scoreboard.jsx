import React, {PropTypes} from 'react'
import Score from '../containers/Score'
import Lines from '../containers/Lines'

const Scoreboard = props => (
  <div className='scoreboard'>
    <div className='scoreboardText' id='level'>Level: {props.level}</div>
    <Score />
    <Lines />
  </div>
)

Scoreboard.propTypes = {
  level: PropTypes.number
}

export default Scoreboard
