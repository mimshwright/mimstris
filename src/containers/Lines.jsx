import {connect} from 'react-redux'
import ScoreboardText from '../components/ScoreboardText'

const mapStateToProps = ({lines}) => ({
  label: 'Lines',
  value: lines
})

const Lines = connect(mapStateToProps)(ScoreboardText)

export default Lines
