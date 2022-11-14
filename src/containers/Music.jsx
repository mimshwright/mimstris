import React, { Component } from "react";

class Music extends Component {
  state = {
    readyToPlay: false,
  };

  componentDidMount() {
    this.updatePlayingState();
  }

  componentDidUpdate() {
    this.updatePlayingState();
  }

  updatePlayingState() {
    const player = this.refs.player;
    player.removeEventListener("canplay", this.updatePlayingState.bind(this));

    if (this.state.readyToPlay === false) {
      if (player.readyState >= 2) {
        this.setState({ readyToPlay: true });
        this.updatePlayingState();
      } else {
        player.addEventListener("canplay", this.updatePlayingState.bind(this));
      }
      return;
    }

    if (this.props.isPlaying) {
      player.play().catch((error) => {
        if (error instanceof DOMException) {
          console.warn("Music cannot play until you interact with the DOM.");
        }
      });
    } else {
      player.pause();
    }
  }

  render() {
    return (
      <div className="Music">
        <audio ref="player" src="mimstris.mp3" loop={true} />
        <p className="credits">
          Music by{" "}
          <a href="http://wavecollector.bandcamp.com">Wave Collector</a> and{" "}
          <a href="http://saroon.bandcamp.com">Saroon</a>
        </p>
      </div>
    );
  }
}

export default Music;
