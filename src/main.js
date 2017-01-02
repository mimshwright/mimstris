import config from './config.js'
import {getRandomPiece} from './pieces.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const W = canvas.width
const H = canvas.height

const BACKGROUND_COLOR = '#FF20CC' // pink
const PIECE_COLOR = '#FFFF00' // yellow

let nextPiece = null
let fallRate = null
let gameTime = null
let stepTime = null
let matrix = []

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
  matrix = nextPiece.pattern
  fallRate = config.initialFallRate

  context.scale(20, 20)
  context.fillStyle = BACKGROUND_COLOR
  context.fillRect(0, 0, W, H)
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
    moveCurrentPieceDown()
  }
}

function draw () {
  drawMatrix(matrix, context)
}

function drawMatrix (matrix, context) {
  matrix.map((column, columnIndex) => {
    column.map((value, rowIndex) => {
      if (value) {
        drawBlock(context, rowIndex, columnIndex)
      }
    })
  })
}

function drawBlock (context, row, column) {
  context.fillStyle = nextPiece.color // PIECE_COLOR
  context.fillRect(row, column, 1, 1)
}

function moveCurrentPieceDown () {
  console.log('moveCurrentPieceDown')
}
