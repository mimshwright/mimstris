import React, { Component } from "react";

class Music extends Component {
  componentDidMount() {
    this.updatePlayingState();
  }

  componentDidUpdate() {
    this.updatePlayingState();
  }

  updatePlayingState() {
    const player = this.refs.player;
    if (this.props.isPlaying && player.readyState !== 0) {
      try {
        player.play();
      } catch (e) {
        console.warn("Couldn't load music.");
      }
    } else {
      player.pause();
    }
  }

  render(props) {
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
