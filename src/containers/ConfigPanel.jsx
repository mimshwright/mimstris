import React from 'react'
import {connect} from 'react-redux'
import {getShowNextPiece, toggleShowNextPiece} from '../stores/config'

import ConfigPanelCheckbox from '../components/ConfigPanelCheckbox'

const mapStateToProps = (state) => ({
  showNextPiece: getShowNextPiece(state)
})

const mapDispatchToProps = (dispatch) => ({
  onShowNextChange: () => { dispatch(toggleShowNextPiece()) }
})

const ConfigPanel = props => (
  <div className='configPanel'>
    <ConfigPanelCheckbox label='Show Next Piece' value={props.showNextPiece} onChange={props.onShowNextChange} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel)
