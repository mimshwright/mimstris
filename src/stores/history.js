import {replaceState} from './index'

let previousStates = []

export const saveState = (state) => {
  previousStates.push(state)
}

export const resetHistory = () => {
  previousStates = []
}

export const undoLastPiece = () => {
  if (previousStates && previousStates.length > 0) {
    const previousState = previousStates.pop()
    return replaceState(previousState)
  }
  return { type: 'noop' }
}
