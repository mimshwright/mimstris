import _lt from 'lodash/fp/lt'
import _every from 'lodash/fp/every'
import _cloneDeep from 'lodash/fp/cloneDeep'
import _random from 'lodash/fp/random'

import React from 'react'
import ReactDOM from 'react-dom'

import pressed from 'pressed'
pressed.start()

import config from './config'
import canvasRenderer from './canvasRenderer'
import pieces from './pieces'
import { detectCollision as detectMatrixCollision, rotateRight, rotateLeft, getMatrixWidth, removeRowAndShiftRemaining, createEmptyMatrix, combineMatrices } from './matrixUtil'

import * as actions from './actions'

import App, {store} from './components/App'

const DOWN_KEYS = ['down', 's']
const LEFT_KEYS = ['left', 'a']
const RIGHT_KEYS = ['right', 'd']
const ROTATE_LEFT_KEYS = ['/', 'z']
const ROTATE_RIGHT_KEYS = ['shift']
const START_KEYS = ['enter']

let nextPiece = null
let currentPiece = null
let fallRate = null // Rate of pieces falling in steps down per second
let lateralMovementRate = null // Rate of pieces moving by user control in steps per second
let downMovementRate = null // Rate of pieces moving down by user control in steps per second
let timeSincePieceLastFell = 0 // time since the piece last moved down automatically
let lastFrameTime = 0 // previous frame's current time
let lastRightMove = 0
let lastLeftMove = 0
let lastDownMove = 0
let lastRotate = 0

let board = []
let paused = false
let gameRunning = false
let message = ''

// Automatically pause when window is out of focus
window.onblur = (e) => {
  if (!paused && gameRunning) {
    pauseGame()

    // Unpause when it comes back to focus (but not if the user manually paused)
    window.onfocus = (e) => {
      unpauseGame()
      window.onfocus = null
    }
  }
}

reset()
window.requestAnimationFrame(onFrame)

function onFrame (currentTime) {
  update(currentTime)
  draw()

  window.requestAnimationFrame(onFrame)
}

function reset () {
  store.dispatch(actions.resetScore())
  message = ''

  timeSincePieceLastFell = 0
  lastFrameTime = 0
  fallRate = config.initialFallRate
  lateralMovementRate = config.lateralMovementRate
  downMovementRate = config.downMovementRate

  nextPiece = getRandomPiece()
  currentPiece = null
  board = createEmptyMatrix(...config.boardSize)
  spawnNextPiece()

  paused = false
  gameRunning = true
}

function pauseGame () {
  paused = true
  message = 'Paused'
}
function unpauseGame () {
  paused = false
  message = ''
}

function update (currentTime) {
  let deltaTime = currentTime - lastFrameTime
  lastFrameTime = currentTime

  if (pressed.some(...START_KEYS)) {
    if (gameRunning === false) {
      reset()
    } else {
      paused ? unpauseGame() : pauseGame()
    }
    pressed.remove(...START_KEYS)
  }

  if (gameRunning === false || paused) {
    return
  }

  if (!currentPiece) {
    spawnNextPiece()
  }

  const lateralMovementThreshold = Math.ceil(1000 / lateralMovementRate)
  const downMovementThreshold = Math.ceil(1000 / downMovementRate)

  // Handle user input...
  if (pressed.some(...DOWN_KEYS)) {
    if (currentTime - lastDownMove > downMovementThreshold) {
      lastDownMove = currentTime

      if (config.instantDown) {
        while (!detectCollisionBelow(board, currentPiece)) {
          makePieceFall(currentPiece)
        }
        pressed.remove(...DOWN_KEYS)
      } else {
        makePieceFall(currentPiece)
      }
    }
  } else {
    lastDownMove = 0
  }

  if (pressed.some(...LEFT_KEYS)) {
    if (currentTime - lastLeftMove > lateralMovementThreshold) {
      lastLeftMove = currentTime
      movePieceLeft(currentPiece)
    }
  } else {
    lastLeftMove = 0
  }

  if (pressed.some(...RIGHT_KEYS)) {
    if (currentTime - lastRightMove > lateralMovementThreshold) {
      lastRightMove = currentTime
      movePieceRight(currentPiece)
    }
  } else {
    lastRightMove = 0
  }

  if (pressed.some(...ROTATE_LEFT_KEYS, ...ROTATE_RIGHT_KEYS)) {
    if (currentTime - lastRotate > lateralMovementThreshold) {
      lastRotate = currentTime
      if (pressed.some(...ROTATE_LEFT_KEYS)) {
        rotatePieceLeft(currentPiece)
      }
      if (pressed.some(...ROTATE_RIGHT_KEYS)) {
        rotatePieceRight(currentPiece)
      }
    }
  } else {
    lastRotate = 0
  }

  timeSincePieceLastFell += deltaTime
  const adjustedFallRate = fallRate + store.getState().level * config.fallRateLevelModifier
  const stepThreshold = Math.ceil(1000 / adjustedFallRate)
  if (timeSincePieceLastFell > stepThreshold) {
    // console.log('tick')
    makePieceFall(currentPiece)
  }

  if (detectCollision(board, currentPiece)) {
    // console.log('Collision detected!')

    // This bit of foo allows you to shift the piece around a bit and only
    // detects collisions at the end of the step instead of at the beginning.
    currentPiece.y -= 1
    board = resolveCollision(board, currentPiece)
    spawnNextPiece()

    const level = store.getState().level
    store.dispatch(actions.addPieceScore(level))

    if (detectCollision(board, currentPiece)) {
      console.error('Game over! Press ENTER to restart.')
      message = 'Game Over!'
      gameRunning = false
    }
  }

  board = clearCompletedLines(board)
}

function makePieceFall (piece) {
  timeSincePieceLastFell = 0
  piece.y += 1
}

function spawnNextPiece () {
  const [W] = config.boardSize
  currentPiece = clonePiece(nextPiece)
  currentPiece.x = Math.floor((W - currentPiece.matrix[0].length) / 2)

  nextPiece = getRandomPiece()
  // console.log(currentPiece.name, '(', nextPiece.name, 'next )')
}

function clonePiece (piece) {
  let clonedPiece = _cloneDeep(piece)
  clonedPiece.x = clonedPiece.x || 0
  clonedPiece.y = clonedPiece.y || 0
  return clonedPiece
}

function getRandomPiece () {
  const l = pieces.length
  const i = _random(0, l - 1)
  return pieces[i]
}

function movePieceLeft (piece) {
  piece.x -= 1
  if (detectCollision(board, piece)) { piece.x += 1 }
}

function movePieceRight (piece) {
  piece.x += 1
  if (detectCollision(board, piece)) { piece.x -= 1 }
}

function rotatePieceRight (piece) {
  const matrixBeforeRotation = piece.matrix
  piece.matrix = rotateRight(piece.matrix)
  validateRotation(board, piece, matrixBeforeRotation)
}

function rotatePieceLeft (piece) {
  const matrixBeforeRotation = piece.matrix
  piece.matrix = rotateLeft(piece.matrix)
  validateRotation(board, piece, matrixBeforeRotation)
}

function validateRotation (board, piece, originalMatrix) {
  let originalX = piece.x
  let pieceWidth = getMatrixWidth(piece.matrix)
  let offsetX = 1

  while (detectCollision(board, piece)) {
    piece.x += offsetX

    // flip direction and add one square after trying left and right
    if (offsetX > 0) {
      offsetX = -offsetX
    } else {
      offsetX = -offsetX + 1
    }

    if (Math.abs(offsetX) > Math.ceil(pieceWidth / 2)) {
      piece.matrix = originalMatrix
      piece.x = originalX
      return piece
    }
  }
}

function detectCollision (board, {x, y, matrix: pieceMatrix}) {
  return detectMatrixCollision(board, pieceMatrix, x, y)
}

function detectCollisionBelow (board, {x, y, matrix: pieceMatrix}) {
  return detectMatrixCollision(board, pieceMatrix, x, y + 1)
}

function resolveCollision (board, {matrix: pieceMatrix, x, y}) {
  return combineMatrices(board, pieceMatrix, x, y, false)
}

function clearCompletedLines (board) {
  let fullRows = board.reduce((fullRows, row, rowIndex, board) => {
    if (_every(_lt(0))(row)) {
      fullRows.push(rowIndex)
    }
    return fullRows
  }, [])

  if (fullRows.length) {
    const state = store.getState()

    const clearedLines = fullRows.length
    const lines = state.lines
    const level = state.level
    store.dispatch(actions.addClearedLineScore(clearedLines, level))
    store.dispatch(actions.incrementLines(clearedLines))

    if (lines >= (level + 1) * config.newLevelEvery) {
      const incrementLevelAction = actions.setLevel(level + 1)
      store.dispatch(incrementLevelAction)
    }
  }

  return fullRows.reduce((board, rowIndex) => removeRowAndShiftRemaining(board, rowIndex), board)
}

function draw () {
  canvasRenderer.drawGame(board, currentPiece)
  ReactDOM.render(
    <App message={message}
      nextPiece={nextPiece}
       />, document.getElementById('app'))
}
