import _every from 'lodash/fp/every'
import _lt from 'lodash/fp/lt'
import _clamp from 'lodash/fp/clamp'

import pressed from 'pressed'
pressed.start()

import config from './config.js'
import { getRandomPiece, clonePiece, getColorForID } from './pieces.js'
import { detectCollision as detectMatrixCollision, rotateRight, rotateLeft, getMatrixWidth, removeRowAndShiftRemaining, createEmptyMatrix, combineMatrices } from './matrixUtil.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const W = 12
const H = 20
context.scale(20, 20)

const DOWN_KEYS = ['down', 's']
const LEFT_KEYS = ['left', 'a']
const RIGHT_KEYS = ['right', 'd']
const ROTATE_LEFT_KEYS = ['/', 'z']
const ROTATE_RIGHT_KEYS = ['shift']

const BACKGROUND_COLOR = '#00263F'
// const PIECE_COLOR = '#FFFF00' // yellow

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

reset()
window.requestAnimationFrame(onFrame)

function onFrame (currentTime) {
  update(currentTime)
  draw()

  window.requestAnimationFrame(onFrame)
}

function reset () {
  timeSincePieceLastFell = 0
  lastFrameTime = 0
  fallRate = config.initialFallRate
  lateralMovementRate = config.lateralMovementRate
  downMovementRate = config.downMovementRate

  nextPiece = getRandomPiece()
  currentPiece = null
  board = createEmptyMatrix(W, H)

  spawnNextPiece()
}

function update (currentTime) {
  let deltaTime = currentTime - lastFrameTime
  lastFrameTime = currentTime

  if (!currentPiece) {
    spawnNextPiece()
  }

  if (detectCollisionBelow(board, currentPiece)) {
    console.log('Collision detected!')
    board = resolveCollision(board, currentPiece)
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
  const stepThreshold = Math.ceil(1000 / fallRate)
  if (timeSincePieceLastFell > stepThreshold) {
    console.log('tick')
    makePieceFall(currentPiece)
  }

  board = clearCompletedLines(board)
}

function makePieceFall (piece) {
  timeSincePieceLastFell = 0
  piece.y += 1
}

function spawnNextPiece () {
  currentPiece = clonePiece(nextPiece)
  currentPiece.x = Math.floor((W - currentPiece.matrix[0].length) / 2)

  nextPiece = getRandomPiece()
  console.log(currentPiece.name, '(', nextPiece.name, 'next )')

  if (detectCollisionBelow(board, currentPiece)) {
    console.error('Game over!')
    reset()
  }
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
  piece.matrix = rotateRight(piece.matrix)
  piece.x = _clamp(0, W - getMatrixWidth(piece.matrix), piece.x)
}
function rotatePieceLeft (piece) {
  piece.matrix = rotateLeft(piece.matrix)
  piece.x = _clamp(0, W - getMatrixWidth(piece.matrix), piece.x)
}

function detectCollision (board, {x, y, matrix: pieceMatrix}) {
  return detectMatrixCollision(board, pieceMatrix, x, y + 1)
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
  return fullRows.reduce((board, rowIndex) => removeRowAndShiftRemaining(board, rowIndex), board)
}

function draw () {
  clearCanvas(context)
  drawBoard(board)
  drawPiece(context, currentPiece)
}

function clearCanvas (context) {
  context.fillStyle = BACKGROUND_COLOR
  context.fillRect(0, 0, W, H)

  if (config.drawGuideLines) {
    context.fillStyle = '#001320'
    let x = 0
    while (x < W) {
      x++
      if (x % 2 === 0) { continue }
      context.fillRect(x, 0, 1, H)
    }
  }
}

function drawMatrix (context, matrix, offsetX = 0, offsetY = 0) {
  matrix.map((column, columnIndex) => {
    column.map((value, rowIndex) => {
      if (value !== 0) {
        drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, getColorForID(value))
      } else {
        // drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, BACKGROUND_COLOR)
      }
    })
  })
}

function drawBoard (board) {
  drawMatrix(context, board, 0, 0)
}

function drawPiece (context, piece) {
  drawMatrix(context, piece.matrix, piece.x, piece.y)
}

function drawBlock (context, row, column, color) {
  // fill block
  context.fillStyle = color
  context.fillRect(row, column, 1, 1)

  // outline block
  if (config.outlinePieces) {
    context.beginPath()
    context.strokeStyle = BACKGROUND_COLOR
    context.lineWidth = 0.05
    context.moveTo(row, column)
    context.lineTo(row + 1, column)
    context.lineTo(row + 1, column + 1)
    context.lineTo(row, column + 1)
    context.lineTo(row, column)
    context.stroke()
  }
}
