// React and react components
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

// Utils
import cloneDeep from 'lodash/fp/cloneDeep'
import createRandomNumberGenerator from 'random-seed'
import pressed from 'pressed'
import { detectCollision as detectMatrixCollision, getFullRows } from './matrixUtil'

// Constants
import config from './config'
import pieceLibrary from './pieceLibrary'

// Redux stores
import store from './stores'
import * as score from './stores/score'
import * as lines from './stores/lines'
import * as level from './stores/level'
import * as fallRate from './stores/fallRate'
import * as nextPiece from './stores/nextPiece'
import * as currentPiece from './stores/currentPiece'
import * as board from './stores/board'
import * as gameState from './stores/gameState'
import * as configStore from './stores/config'

// Shortcuts to getters and dispatching actions
const dispatch = store.dispatch
const wrapGetter = getter => getter(store.getState())
const getCurrentPiece = () => wrapGetter(currentPiece.getCurrentPiece)
const getBoard = () => wrapGetter(board.getBoard)
const getNextPiece = () => wrapGetter(nextPiece.getNextPiece)
const getLevel = () => wrapGetter(level.getLevel)
const getLines = () => wrapGetter(lines.getLines)
const getFallRate = () => wrapGetter(fallRate.getFallRate)
const getGameState = () => wrapGetter(gameState.getGameState)
const getDeterministicMode = () => wrapGetter(configStore.getDeterministicMode)

const startGame = () => dispatch(gameState.setGameState(gameState.GAME_STATE_RUNNING))
const pauseGame = () => dispatch(gameState.setGameState(gameState.GAME_STATE_PAUSED))
const unpauseGame = () => dispatch(gameState.setGameState(gameState.GAME_STATE_RUNNING))
const endGame = () => dispatch(gameState.setGameState(gameState.GAME_STATE_GAME_OVER))
const movePieceDown = (piece) => dispatch(currentPiece.movePieceDown())
const movePieceLeft = (piece) => dispatch(currentPiece.movePieceLeft(getBoard()))
const movePieceRight = (piece) => dispatch(currentPiece.movePieceRight(getBoard()))
const rotatePieceRight = (piece) => dispatch(currentPiece.rotateRight(getBoard()))
const rotatePieceLeft = (piece) => dispatch(currentPiece.rotateLeft(getBoard()))
const makeNextPieceCurrent = () => dispatch(currentPiece.setCurrentPiece(centerPiece(getNextPiece())))
const randomizeNextPiece = () => dispatch(nextPiece.setNextPiece(getRandomPiece()))

// Key mappings
const DOWN_KEYS = ['down', 's']
const LEFT_KEYS = ['left', 'a']
const RIGHT_KEYS = ['right', 'd']
const ROTATE_LEFT_KEYS = ['/', 'z']
const ROTATE_RIGHT_KEYS = ['shift', 'up']
const START_KEYS = ['enter']

// Other variables
let random = null
let lateralMovementRate = null // Rate of pieces moving by user control in steps per second
let downMovementRate = null // Rate of pieces moving down by user control in steps per second
let lastRightMove = 0
let lastLeftMove = 0
let lastDownMove = 0
let lastRotate = 0
let timeSincePieceLastFell = 0 // time since the piece last moved down automatically
let lastFrameTime = 0 // previous frame's current time
let previousDeterministicModeState = config.deterministicMode

// Main executable code:
main()

function main () {
  // Initialize pressed utility for tracking key presses
  pressed.start(window)

  // Reset values for game
  resetGame()

  // Initialize react components
  ReactDOM.render(<App />, document.getElementById('app'))

  // Start update loop
  window.requestAnimationFrame(onFrame)

  // listen for changes on the redux state
  store.subscribe(onStateChange)

  // Automatically pause when window is out of focus
  window.onblur = (e) => {
    if (getGameState() === gameState.GAME_STATE_RUNNING) {
      pauseGame()

      // Unpause when it comes back to focus (but not if the user manually paused)
      window.onfocus = (e) => {
        unpauseGame()
        window.onfocus = null
      }
    }
  }
}

function onStateChange () {
  if (previousDeterministicModeState !== getDeterministicMode()) {
    // if deterministicMode has changed, reset the game.
    previousDeterministicModeState = getDeterministicMode()
    resetGame()
  }
}

function onFrame (currentTime) {
  update(currentTime)
  window.requestAnimationFrame(onFrame)
}

function resetGame () {
  // Create Random Number Generator.
  // If running in deterministic mode, the random number generator
  // will use a random seed that creates a repeatable pattern of blocks
  let seed
  if (getDeterministicMode()) {
    seed = config.randomSeed
  }
  random = createRandomNumberGenerator.create(seed)

  // reset timers
  timeSincePieceLastFell = 0
  lastFrameTime = 0
  lateralMovementRate = config.lateralMovementRate
  downMovementRate = config.downMovementRate

  // reset game objects
  dispatch(board.resetBoard())
  dispatch(score.resetScore())

  randomizeNextPiece()
  makeNextPieceCurrent()
  randomizeNextPiece()

  startGame()
}

function update (currentTime) {
  let deltaTime = currentTime - lastFrameTime
  lastFrameTime = currentTime

  // Handle pausing and restarting of game.
  handleStartButton(currentTime)

  // If game isn't running, ignore the rest of the update
  if (getGameState() !== gameState.GAME_STATE_RUNNING) {
    return
  }

  // Handle piece movement from user and timer
  handleUserMovement(currentTime)
  handleAutomaticFalling(deltaTime)

  if (detectCollision()) {
    mergeCurrentPieceIntoBoard()
    clearCompletedLines()
    makeNextPieceCurrent()
    randomizeNextPiece()

    // If there is still a collision right after a new piece is spawned, the game ends.
    if (detectCollision()) {
      endGame()
      // console.error('Game over! Press ENTER to restart.')
    }
  }
}

function handleStartButton (currentTime) {
  if (pressed.some(...START_KEYS)) {
    if (getGameState() === gameState.GAME_STATE_GAME_OVER) {
      resetGame()
    } else {
      getGameState() === gameState.GAME_STATE_PAUSED ? unpauseGame() : pauseGame()
    }
    pressed.remove(...START_KEYS)
  }
}

/**
 * Handles user input for movement.
 * Checks to see if these input keys are currently pressed.
 * Each movement has a built in timer which allows some fine grain control over
 * how often each input can be executed.
 */
function handleUserMovement (currentTime) {
  // Calculate whether movement is allowed
  const lateralMovementThreshold = Math.ceil(1000 / lateralMovementRate)
  const isLeftMovementAllowed = (currentTime - lastLeftMove) > lateralMovementThreshold
  const isRightMovementAllowed = (currentTime - lastRightMove) > lateralMovementThreshold
  const isRotateAllowed = (currentTime - lastRotate) > lateralMovementThreshold
  const isDownMovementAllowed = (currentTime - lastDownMove) > (Math.ceil(1000 / downMovementRate))

  if (pressed.some(...DOWN_KEYS)) {
    if (isDownMovementAllowed) {
      lastDownMove = currentTime

      if (config.instantDown) {
        while (!detectCollisionBelow()) {
          timeSincePieceLastFell = 0
          movePieceDown(getCurrentPiece())
        }
        pressed.remove(...DOWN_KEYS)
      } else {
        timeSincePieceLastFell = 0
        movePieceDown(getCurrentPiece())
      }
    }
  } else {
    lastDownMove = 0
  }

  if (pressed.some(...LEFT_KEYS)) {
    if (isLeftMovementAllowed) {
      lastLeftMove = currentTime
      movePieceLeft(getCurrentPiece())
    }
  } else {
    lastLeftMove = 0
  }

  if (pressed.some(...RIGHT_KEYS)) {
    if (isRightMovementAllowed) {
      lastRightMove = currentTime
      movePieceRight(getCurrentPiece())
    }
  } else {
    lastRightMove = 0
  }

  if (pressed.some(...ROTATE_LEFT_KEYS, ...ROTATE_RIGHT_KEYS)) {
    if (isRotateAllowed) {
      lastRotate = currentTime
      if (pressed.some(...ROTATE_LEFT_KEYS)) {
        rotatePieceLeft(getCurrentPiece())
      }
      if (pressed.some(...ROTATE_RIGHT_KEYS)) {
        rotatePieceRight(getCurrentPiece())
      }
    }
  } else {
    lastRotate = 0
  }
}

/**
 * Updates position of piece if enough time has elapsed since last downward movement.
 */
function handleAutomaticFalling (deltaTime) {
  timeSincePieceLastFell += deltaTime
  const shouldPieceFall = timeSincePieceLastFell > Math.ceil(1000 / getFallRate())
  if (shouldPieceFall) {
    timeSincePieceLastFell = 0
    movePieceDown(getCurrentPiece())
  }
}

/**
 * Affixes the current piece to the board.
 */
function mergeCurrentPieceIntoBoard () {
  // First moves the piece up one space.
  // This bit of foo allows you to shift the piece around a bit and only
  // detects collisions at the end of the step instead of at the beginning.
  const previousPositionPiece = cloneDeep(getCurrentPiece())
  previousPositionPiece.y -= 1
  dispatch(board.mergePieceIntoBoard(previousPositionPiece))

  // Add score for piece
  dispatch(score.addPieceScore(getLevel()))
}

/**
 * Removes and scores completed lines in the board.
 */
function clearCompletedLines () {
  const fullRowIndeces = getFullRows(getBoard())
  const numberOfClearedLines = fullRowIndeces ? fullRowIndeces.length : 0
  if (numberOfClearedLines > 0) {
    dispatch(score.addClearedLineScore(numberOfClearedLines, getLevel()))
    dispatch(lines.setLines(getLines() + numberOfClearedLines))
    dispatch(board.clearCompletedLines())
  }
}

/**
 * Positions a piece in the center of the board.
 * @returns a copy of the input piece
 */
function centerPiece (piece) {
  const [W] = config.boardSize
  piece = cloneDeep(piece)
  piece.x = Math.floor((W - piece.matrix[0].length) / 2)
  return piece
}

/**
 * Returns a random piece from the piece library.
 * Note: random function is defined in reset()
 * Note: the piece is not cloned
 * @returns Piece
 */
function getRandomPiece () {
  const l = pieceLibrary.length
  const i = random(l)
  return pieceLibrary[i]
}

/**
 * Shortcut for detecting collisions between the matrix of the board
 * and the matrix of the piece at the piece's position.
 * @returns Boolean
 */
function detectCollision (board = getBoard(), piece = getCurrentPiece()) {
  const {x, y, matrix} = piece
  return detectMatrixCollision(board, matrix, x, y)
}

/**
 * Shortcut for detecting collisions between the matrix of the board
 * and the matrix of the piece one block below the piece's position.
 * This is used to determine if the piece will be blocked from moving
 * any further down.
 * @returns Boolean
 */
function detectCollisionBelow (board = getBoard(), piece = getCurrentPiece()) {
  const {x, y, matrix} = piece
  return detectMatrixCollision(board, matrix, x, y + 1)
}
