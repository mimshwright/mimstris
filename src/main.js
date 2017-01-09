import keycode from 'keycode'
import _every from 'lodash/fp/every'
import _lt from 'lodash/fp/lt'

import config from './config.js'
import {getRandomPiece, clonePiece, getColorForID, rotatePieceLeft, rotatePieceRight} from './pieces.js'
import {detectCollision as detectMatrixCollision, removeRowAndShiftRemaining, createEmptyMatrix, combineMatrices, getMatrixHeight, getMatrixWidth} from './matrixUtil.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const W = 12
const H = 20

const BACKGROUND_COLOR = '#00263F'
// const PIECE_COLOR = '#FFFF00' // yellow

let nextPiece = null
let currentPiece = null
let fallRate = null // Rate of pieces falling in steps down per second
let timeSincePieceLastFell = 0 // time since the piece last moved down automatically
let lastTime = 0 // previous frame's current time
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
  lastTime = 0
  fallRate = config.initialFallRate

  nextPiece = getRandomPiece()
  board = createEmptyMatrix(W, H)

  context.scale(20, 20)
  context.fillStyle = 0
  context.fillRect(0, 0, context.width, context.height)
}

function update (currentTime) {
  let deltaTime = currentTime - lastTime
  lastTime = currentTime

  if (!currentPiece) {
    spawnNextPiece()
  }

  if (detectCollision(board, currentPiece)) {
    console.log('Collision detected!')
    board = resolveCollision(board, currentPiece)
    spawnNextPiece()
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

  if (detectCollision(board, currentPiece)) {
    reset()
  }

  nextPiece = getRandomPiece()
  console.log(currentPiece.name, '(', nextPiece.name, 'next )')
}

function movePieceLeft (piece) {
  piece.x -= 1
  // piece.x = Math.max(piece.x - 1, 0)
  if (detectCollision(board, piece)) { piece.x += 1 }
}

function movePieceRight (piece) {
  piece.x += 1
  // piece.x = Math.min(piece.x + 1, W - getMatrixWidth(piece.matrix))
  if (detectCollision(board, piece)) { piece.x -= 1 }
}

function detectCollision (board, {x, y, matrix: pieceMatrix}) {
  // const left = piece.x
  // const right = piece.x + getMatrixWidth(piece.matrix)
  // const top = piece.y
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

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    // case keycode('up'):
    // case keycode('w'):
      // currentPiece.y -= 1
      // break
    case keycode('down'):
    case keycode('s'):
      makePieceFall(currentPiece)
      break
    case keycode('left'):
    case keycode('a'):
      movePieceLeft(currentPiece)
      break
    case keycode('right'):
    case keycode('d'):
      movePieceRight(currentPiece)
      break
    case keycode('shift'):
      rotatePieceRight(currentPiece)
      break
    case keycode('/'):
    case keycode('z'):
      rotatePieceLeft(currentPiece)
      break
    default:
      // nothing
  }
})

function draw () {
  clearCanvas(context)
  drawMatrix(context, board, 0, 0)
  drawPiece(context, currentPiece)
}

function clearCanvas (context) {
  context.fillStyle = BACKGROUND_COLOR
  context.fillRect(0, 0, W, H)

  context.fillStyle = '#001320'
  let x = 0
  while (x < W) {
    x++
    if (x % 2 === 0) { continue }
    context.fillRect(x, 0, 1, H)
  }
}

function drawMatrix (context, matrix, offsetX = 0, offsetY = 0) {
  matrix.map((column, columnIndex) => {
    column.map((value, rowIndex) => {
      if (value) {
        drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, getColorForID(value))
      } else {
        // drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, BACKGROUND_COLOR)
      }
    })
  })
}

function drawPiece (context, piece) {
  drawMatrix(context, piece.matrix, piece.x, piece.y)
}

function drawBlock (context, row, column, color) {
  context.fillStyle = color
  context.fillRect(row, column, 1, 1)
}
