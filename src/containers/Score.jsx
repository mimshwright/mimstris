import {connect} from 'react-redux'
import commaNumber from 'comma-number'
import ScoreboardText from '../components/ScoreboardText'

const mapStateToProps = ({score}) => ({
  label: 'Score',
  value: commaNumber(score)
})

const Score = connect(mapStateToProps)(ScoreboardText)

export default Score
