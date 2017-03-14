import React from 'react'
import {connect} from 'react-redux'
import * as config from '../stores/config'
import {allPieceNames} from '../pieceLibrary'

import ConfigPanelCheckbox from '../components/ConfigPanelCheckbox'
import ConfigPanelText from '../components/ConfigPanelText'

const mapStateToProps = (state) => ({
  showNextPiece: config.getShowNextPiece(state),
  midnightMode: config.getMidnightMode(state),
  deterministicMode: config.getDeterministicMode(state),
  activePieces: config.getActivePieces(state)
})

const mapDispatchToProps = (dispatch) => ({
  onShowNextChange: () => { dispatch(config.toggleShowNextPiece()) },
  onMidnightModeChange: () => { dispatch(config.toggleMidnightMode()) },
  onDeterministicModeChange: () => { dispatch(config.toggleDeterministicMode()) },
  onActivePiecesChange: (activePieces) => { dispatch(config.setActivePieces(activePieces)) }
})

const ConfigPanel = props => (
  <div className='configPanel'>
    <h3>Config</h3>
    <div className='configOptions'>
      <ConfigPanelCheckbox label='Show Next Piece' value={props.showNextPiece} onChange={props.onShowNextChange} />
      <ConfigPanelCheckbox label='Midnight Mode' value={props.midnightMode} onChange={props.onMidnightModeChange} />
      <ConfigPanelCheckbox label='Deterministic Mode' instructions='(forces reset)' value={props.deterministicMode} onChange={props.onDeterministicModeChange} />
      <ConfigPanelText label='Active Pieces' instructions={'All pieces: ' + allPieceNames} value={props.activePieces} onChange={props.onActivePiecesChange} />
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel)
