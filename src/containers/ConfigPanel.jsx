import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as config from '../stores/config'
import {allPieceNames} from '../pieceLibrary'

import ConfigPanelCheckbox from '../components/ConfigPanelCheckbox'
import ConfigPanelText from '../components/ConfigPanelText'

const mapStateToProps = (state) => ({
  playMusic: config.getPlayMusic(state),
  showNextPiece: config.getShowNextPiece(state),
  midnightMode: config.getMidnightMode(state),
  deterministicMode: config.getDeterministicMode(state),
  activePieces: config.getActivePieces(state)
})

const mapDispatchToProps = (dispatch) => ({
  onShowNextChange: () => { dispatch(config.toggleShowNextPiece()) },
  onPlayMusicChange: () => { dispatch(config.togglePlayMusic()) },
  onMidnightModeChange: () => { dispatch(config.toggleMidnightMode()) },
  onDeterministicModeChange: () => { dispatch(config.toggleDeterministicMode()) },
  onActivePiecesChange: (activePieces) => { dispatch(config.setActivePieces(activePieces)) }
})

class ConfigPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }

    this.onClickVisibility = () => this.setState({ visible: !this.state.visible })
  }

  render () {
    const props = this.props
    return (
      <div className='configPanel'>
        <button onClick={this.onClickVisibility}>{this.state.visible ? '👇' : '👉'}</button>
        <h3 onClick={this.onClickVisibility}>Config</h3>
        { this.state.visible ? (
          <div className='configOptions'>
            <ConfigPanelCheckbox label='Play Music' value={props.playMusic} onChange={props.onPlayMusicChange} />
            <ConfigPanelCheckbox label='Show Next Piece' value={props.showNextPiece} onChange={props.onShowNextChange} />
            <ConfigPanelCheckbox label='Midnight Mode' value={props.midnightMode} onChange={props.onMidnightModeChange} />
            <ConfigPanelCheckbox label='Deterministic Mode' instructions='(forces reset)' value={props.deterministicMode} onChange={props.onDeterministicModeChange} />
            <ConfigPanelText label='Active Pieces' instructions={'All pieces: ' + allPieceNames} value={props.activePieces} onChange={props.onActivePiecesChange} />
          </div>)
        : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel)
