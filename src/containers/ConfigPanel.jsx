import React from 'react'
import {connect} from 'react-redux'
import * as config from '../stores/config'

import ConfigPanelCheckbox from '../components/ConfigPanelCheckbox'

const mapStateToProps = (state) => ({
  showNextPiece: config.getShowNextPiece(state),
  midnightMode: config.getMidnightMode(state)
})

const mapDispatchToProps = (dispatch) => ({
  onShowNextChange: () => { dispatch(config.toggleShowNextPiece()) },
  onMidnightModeChange: () => { dispatch(config.toggleMidnightMode()) }
})

const ConfigPanel = props => (
  <div className='configPanel'>
    <ConfigPanelCheckbox label='Show Next Piece' value={props.showNextPiece} onChange={props.onShowNextChange} />
    <ConfigPanelCheckbox label='Midnight Mode' value={props.midnightMode} onChange={props.onMidnightModeChange} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel)
