import keycode from 'keycode'

import config from './config.js'
import {getRandomPiece, clonePiece, rotatePieceLeft, rotatePieceRight} from './pieces.js'
import {createEmptyMatrix} from './matrixUtil.js' // combineMatrices

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const W = 12
const H = 20

const BACKGROUND_COLOR = '#FF20CC' // pink
// const PIECE_COLOR = '#FFFF00' // yellow

let nextPiece = null
let currentPiece = null
let fallRate = null
let gameTime = null
let stepTime = null
let board = []

reset()

window.requestAnimationFrame(onFrame)

function onFrame (currentTime) {
  update(currentTime)
  draw()

  window.requestAnimationFrame(onFrame)
}

function reset () {
  gameTime = null
  stepTime = null
  nextPiece = getRandomPiece()
  currentPiece = clonePiece(nextPiece)
  console.log(nextPiece.name)
  board = createEmptyMatrix(W, H)
  // console.table(board)

  fallRate = config.initialFallRate

  context.scale(20, 20)
  context.fillStyle = 0
  context.fillRect(0, 0, context.width, context.height)
}

function update (currentTime) {
  if (!gameTime) {
    gameTime = currentTime
  }
  if (!stepTime) {
    stepTime = currentTime
  }
  const currentStep = currentTime - stepTime
  const stepSize = Math.ceil(1000 / fallRate)
  if (currentStep > stepSize) {
    stepTime = currentTime
    currentPiece.y += 1
    console.log('tick')
  }
}

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case keycode('up'):
    case keycode('w'):
      currentPiece.y -= 1
      break
    case keycode('down'):
    case keycode('s'):
      currentPiece.y += 1
      break
    case keycode('left'):
    case keycode('a'):
      currentPiece.x -= 1
      break
    case keycode('right'):
    case keycode('d'):
      currentPiece.x += 1
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
  drawMatrix(context, board)
  drawPiece(context, currentPiece)
}

function drawMatrix (context, matrix, offsetX = 0, offsetY = 0) {
  matrix.map((column, columnIndex) => {
    column.map((value, rowIndex) => {
      if (value) {
        drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, currentPiece.color)
      } else {
        drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, BACKGROUND_COLOR)
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
