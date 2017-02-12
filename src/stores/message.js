export const CLEAR_MESSAGE = 'Clear message'
export const clearMessage = () => ({ type: CLEAR_MESSAGE })

export const SET_MESSAGE = 'Set message'
export const setMessage = message => ({ type: SET_MESSAGE, message })

const initialState = ''

export default function reducers (previousMessage = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return initialState
    case SET_MESSAGE:
      return action.message
    default:
      return previousMessage
  }
}

export const getMessage = state => state.message
