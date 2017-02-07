import React from 'react'
import Score from '../containers/Score'
import Level from '../containers/Level'
import Lines from '../containers/Lines'

const Scoreboard = props => (
  <div className='scoreboard'>
    <Level />
    <Score />
    <Lines />
  </div>
)

Scoreboard.propTypes = {
}

export default Scoreboard
