import {createSelector} from 'reselect'
import config from '../config'

const lines = state => state.lines

const level = createSelector(
  lines,
  (lines) => Math.max(config.startLevel, Math.floor(lines / config.newLevelEvery))
)
export default level
