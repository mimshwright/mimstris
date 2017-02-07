import {connect} from 'react-redux'
import ScoreboardText from '../components/ScoreboardText'

const mapStateToProps = ({gameMetrics: {level}}) => ({
  label: 'Level',
  value: level
})

const Level = connect(mapStateToProps)(ScoreboardText)

export default Level
