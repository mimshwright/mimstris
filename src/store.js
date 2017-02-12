import { createStore } from 'redux'
import reducer from './stores'

export default createStore(
  reducer,
  // To trigger dev tools in browser extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
