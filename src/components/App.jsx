import React from 'react'

import Scoreboard from './Scoreboard'
import Instructions from './Instructions'
import Message from './Message'

const App = props => (
  <div>
    <Scoreboard />
    <div className='game-wrapper '>
      <canvas id='game' width='240' height='400' />
      <Message />
    </div>

    <Instructions />
  </div>
)

export default App
