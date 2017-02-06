import * as actions from '../actions/actions'

const lines = (previousLines = 0, action = null) => {
  if (!action) {
    return previousLines
  }
  switch (action.type) {
    case actions.SET_LINES:
      return action.lines
    default:
      return previousLines
  }
}

export default lines
