import React, {PropTypes} from 'react'

import config from '../config'

const toggleMidnightMode = () => (config.midnightMode = !config.midnightMode)
const toggleShowNext = () => (config.showNextPiece = !config.showNextPiece)
const toggleShowGuideLines = () => (config.showGuideLines = !config.showGuideLines)
const toggleInstantDown = () => (config.instantDown = !config.instantDown)

const ConfigPanel = props => (
  <div className='configPanel'>
    <ul>
      <li>Show Next Piece: <input type='checkbox' onChange={toggleShowNext} checked={config.showNextPiece ? 'checked' : ''} /></li>
      <li>Show Guide Lines: <input type='checkbox' onChange={toggleShowGuideLines} checked={config.showGuideLines ? 'checked' : ''} /></li>
      <li>Midnight Mode: <input type='checkbox' onChange={toggleMidnightMode} checked={config.midnightMode ? 'checked' : ''} /></li>
      <li>Instant Down: <input type='checkbox' onChange={toggleInstantDown} checked={config.instantDown ? 'checked' : ''} /></li>
    </ul>
  </div>
)

export default ConfigPanel
