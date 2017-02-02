import config from './config.js'
// import {getMatrixSize} from './matrixUtil.js'
import _find from 'lodash/fp/find'
import _memoize from 'lodash/fp/memoize'
import pieces from './pieces.js'

const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = canvas
const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize
const SCALE_X = CANVAS_WIDTH / BOARD_WIDTH
const SCALE_Y = CANVAS_HEIGHT / BOARD_HEIGHT

// memoized for performance (roughly doubles speed of draw!)
const getColorForID = _memoize(id => {
  return _find({id: id})(pieces).color
})

function clearCanvas (context) {
  context.fillStyle = config.backgroundColor
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  if (config.drawGuideLines) {
    context.fillStyle = '#001320'
    let x = 0
    while (x < BOARD_WIDTH) {
      x++
      if (x % 2 === 0) { continue }
      context.fillRect(x * SCALE_X, 0, 1 * SCALE_X, CANVAS_HEIGHT)
    }
  }
}

function drawMatrix (context, matrix, offsetX = 0, offsetY = 0) {
  matrix.map((column, columnIndex) => {
    column.map((value, rowIndex) => {
      if (value !== 0) {
        drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, getColorForID(value))
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
  // Scale up coordinates
  const x = row * SCALE_X
  const y = column * SCALE_Y
  const width = SCALE_X
  const height = SCALE_Y

  // fill block
  context.fillStyle = color
  context.fillRect(x, y, width, height)

  // outline block
  if (config.outlinePieces) {
    context.beginPath()
    context.strokeStyle = config.backgroundColor
    context.lineWidth = 1
    context.moveTo(x, y)
    context.lineTo(x + width, y)
    context.lineTo(x + width, y + height)
    context.lineTo(x, y + height)
    context.lineTo(x, y)
    context.stroke()
  }
}

export default {
  draw (board, currentPiece) {
    clearCanvas(context)
    drawBoard(board)
    drawPiece(context, currentPiece)
  }
}
