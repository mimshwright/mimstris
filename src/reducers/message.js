import * as actions from '../actions'

export const message = (previousMessage = '', action) => {
  switch (action.type) {
    case actions.CLEAR_MESSAGE:
      return ''
    case actions.SET_MESSAGE:
      return action.message
    default:
      return previousMessage
  }
}
