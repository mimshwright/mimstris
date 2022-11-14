# Mimstris

An arcade puzzle game created in JS using [React](https://facebook.github.io/react/) / [Redux](http://redux.js.org/).

[🎥 Featured in a lighting talk at the 2017 dotJS Conference in Paris.](https://www.dotconferences.com/2017/12/mims-wright-building-a-puzzle-game-in-react-redux)

_Note: This was originally coded in 2016 and there have been a lot of new developments in JavaScript, React, and Redux since then. I gave the project a very basic update in 2022 (since it wasn't compiling for me anymore) but the code remains mostly unchanged._

**This game is open-source, free, and just for funsies!**

## 👉 [Play Now!](https://mimstris.onrender.com) 🎮 📺

[![Screen Shot](screenshot.gif)](htts://mimstris.onrender.com)

## Motivation

After watching [Meth Meth Method's video](https://www.youtube.com/watch?v=H2aW5V46khA) I was inspired to create a similar game for the following reasons:

1. To try my hand at making a game using functional programming methodologies.
1. To try out some JS tools that I hadn't used before
1. I thought it would be fun to make up crazy custom shapes and/or game modes.

Some of the tools I used:

- [redux](http://redux.js.org/) for state management
- [reselect](https://github.com/reactjs/reselect) for memoized selectors
- [react](https://facebook.github.io/react/) for component rendering
- [Ducks](https://github.com/erikras/ducks-modular-redux) for module organization
- [AVA](https://github.com/avajs/ava) for unit tests and [nyc](https://github.com/istanbuljs/nyc) for code coverage
- [lodash](https://lodash.com/) for numerous utility functions
- [random-seed](https://github.com/skratchdot/random-seed) to create a deterministic game mode (where every game is the same order of pieces)
- [pressed](https://github.com/mimshwright/pressed.js) for detecting key presses in update loop (I created this library for this project)
- babel, webpack, standard (code style)
- ES6

## Controls

| Key       | Action               |
| --------- | -------------------- |
| Left, A   | Left                 |
| Right, D  | Right                |
| Down, S   | Down                 |
| Shift, Up | Rotate Right         |
| Z, /      | Rotate Left          |
| Enter     | Pause / Restart Game |
| M         | Mute / Unmute music  |
