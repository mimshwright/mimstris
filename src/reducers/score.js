import * as actions from '../actions/actions'

const score = (previousScore = 0, action = null) => {
  if (!action) {
    return previousScore
  }
  switch (action.type) {
    case actions.SET_SCORE:
      return action.score
    case actions.INCREMENT_SCORE:
      return action.incrementScoreBy + previousScore
    default:
      return previousScore
  }
}

export default score
