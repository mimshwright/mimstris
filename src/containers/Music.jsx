import React, {Component} from 'react'

class Music extends Component {

  componentDidMount () {
    this.updatePlayingState()
  }

  componentDidUpdate () {
    this.updatePlayingState()
  }

  updatePlayingState () {
    const player = this.refs.player
    if (this.props.isPlaying) {
      player.play()
    } else {
      player.pause()
    }
  }

  render (props) {
    return (
      <audio ref='player' className='Music' src='mimstris.mp3' loop='true' />
    )
  }
}

export default Music
