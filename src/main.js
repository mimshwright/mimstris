import _every from 'lodash/fp/every'
import _lt from 'lodash/fp/lt'
import _clamp from 'lodash/fp/clamp'

import pressed from 'pressed'
pressed.start()

import config from './config.js'
import score from './score.js'
import canvasRenderer from './canvasRenderer.js'
import {updateScoreboard} from './scoreboard.js'
import { getRandomPiece, clonePiece } from './pieces.js'
import { detectCollision as detectMatrixCollision, rotateRight, rotateLeft, getMatrixWidth, removeRowAndShiftRemaining, createEmptyMatrix, combineMatrices } from './matrixUtil.js'

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
let level = 0

// Automatically pause when window is out of focus
window.onblur = (e) => {
  if (!paused) {
    paused = true

    // Unpause when it comes back to focus (but not if the user manually paused)
    window.onfocus = (e) => {
      paused = false
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
  score.reset()
  level = config.startLevel

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

function update (currentTime) {
  let deltaTime = currentTime - lastFrameTime
  lastFrameTime = currentTime

  if (pressed.some(...START_KEYS)) {
    if (gameRunning === false) {
      reset()
    } else {
      paused = !paused
      pressed.remove(...START_KEYS)
    }
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
  const adjustedFallRate = fallRate + level * config.fallRateLevelModifier
  const stepThreshold = Math.ceil(1000 / adjustedFallRate)
  if (timeSincePieceLastFell > stepThreshold) {
    console.log('tick')
    makePieceFall(currentPiece)
  }

  if (detectCollision(board, currentPiece)) {
    console.log('Collision detected!')

    // This bit of foo allows you to shift the piece around a bit and only
    // detects collisions at the end of the step instead of at the beginning.
    currentPiece.y -= 1
    board = resolveCollision(board, currentPiece)
    spawnNextPiece()
    score.increment(score.calculatePieceScore(level))

    if (detectCollision(board, currentPiece)) {
      console.error('Game over! Press ENTER to restart.')
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
  console.log(currentPiece.name, '(', nextPiece.name, 'next )')
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
  const [W] = config.boardSize
  piece.matrix = rotateRight(piece.matrix)
  piece.x = _clamp(0, W - getMatrixWidth(piece.matrix), piece.x)
}
function rotatePieceLeft (piece) {
  const [W] = config.boardSize
  piece.matrix = rotateLeft(piece.matrix)
  piece.x = _clamp(0, W - getMatrixWidth(piece.matrix), piece.x)
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
    const clearedLines = fullRows.length
    score.increment(score.calculateLineScore(clearedLines, level), clearedLines)
    if (score.lines >= (level + 1) * config.newLevelEvery) {
      setLevel(level + 1)
    }
  }

  return fullRows.reduce((board, rowIndex) => removeRowAndShiftRemaining(board, rowIndex), board)
}

function setLevel (newLevel) {
  level = newLevel
}

function draw () {
  canvasRenderer.draw(board, currentPiece)
  updateScoreboard(score.score, score.lines, level)
}
