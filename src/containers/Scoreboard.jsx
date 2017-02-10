import React from 'react'
import {connect} from 'react-redux'
import commaNumber from 'comma-number'
import getLevel from '../selectors/level'

import ScoreboardText from '../components/ScoreboardText'

const mapStateToProps = (state) => ({
  level: commaNumber(getLevel(state)),
  lines: commaNumber(state.lines),
  score: commaNumber(state.score)
})

const Scoreboard = props => (
  <div className='scoreboard'>
    <ScoreboardText label='Level' value={props.level} />
    <ScoreboardText label='Score' value={props.score} />
    <ScoreboardText label='Lines' value={props.lines} />
  </div>
)

export default connect(mapStateToProps)(Scoreboard)
