import React from 'react'
import {connect} from 'react-redux'
import commaNumber from 'comma-number'

import ScoreboardText from '../components/ScoreboardText'

const mapStateToProps = ({score, level, lines}) => ({
  level: commaNumber(level),
  lines: commaNumber(lines),
  score: commaNumber(score)
})

const Scoreboard = props => (
  <div className='scoreboard'>
    <ScoreboardText label='Level' value={props.level} />
    <ScoreboardText label='Score' value={props.score} />
    <ScoreboardText label='Lines' value={props.lines} />
  </div>
)

export default connect(mapStateToProps)(Scoreboard)
