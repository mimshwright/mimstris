import _find from 'lodash/fp/find'
import _memoize from 'lodash/fp/memoize'
import config from './config.js'
import pieces from './pieces.js'

const [BOARD_WIDTH] = config.boardSize

// memoized for performance (roughly doubles speed of draw!)
const getColorForID = _memoize(id => {
  return _find({id: id})(pieces).color
})

function clearCanvas (context, color) {
  context.fillStyle = color
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

function drawGuideLines (context) {
  const { height: CANVAS_HEIGHT } = context.canvas
  let x = 0

  context.fillStyle = config.guideColor
  while (x < BOARD_WIDTH) {
    if (x % 2 === 0) {
      context.fillRect(x * config.blockSize, 0, config.blockSize, CANVAS_HEIGHT)
    }
    x++
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

function drawBoard (context, board) {
  drawMatrix(context, board, 0, 0)
}

function drawPiece (context, piece) {
  drawMatrix(context, piece.matrix, piece.x, piece.y)
}

function drawBlock (context, row, column, color, outlinePieces = true) {
  // Scale up coordinates
  const x = row * config.blockSize
  const y = column * config.blockSize
  const width = config.blockSize
  const height = config.blockSize

  // fill block
  context.fillStyle = color
  context.fillRect(x, y, width, height)

  // outline block
  if (config.outlinePieces && outlinePieces) {
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

function drawGame (board, currentPiece) {
  const canvas = document.getElementById('game')
  if (canvas) {
    const context = canvas.getContext('2d')

    clearCanvas(context, config.backgroundColor)
    if (config.drawGuideLines) {
      drawGuideLines(context)
    }
    drawBoard(context, board)
    drawPiece(context, currentPiece)
  }
}

export default {
  drawGame,
  drawMatrix,
  clearCanvas
}
