import config from './config.js'
// import {getMatrixSize} from './matrixUtil.js'
import _find from 'lodash/fp/find'
import _memoize from 'lodash/fp/memoize'
import pieces from './pieces.js'

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize

// memoized for performance (roughly doubles speed of draw!)
const getColorForID = _memoize(id => {
  return _find({id: id})(pieces).color
})

function clearCanvas (context) {
  context.fillStyle = config.backgroundColor
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

function drawGuideLines (context) {
  const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = context.canvas
  const SCALE_X = CANVAS_WIDTH / BOARD_WIDTH
  let x = 0

  context.fillStyle = config.guideColor
  while (x < BOARD_WIDTH) {
    if (x % 2 === 0) {
      context.fillRect(x * SCALE_X, 0, 1 * SCALE_X, CANVAS_HEIGHT)
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
  const SCALE_X = context.canvas.width / BOARD_WIDTH
  const SCALE_Y = context.canvas.height / BOARD_HEIGHT
  // Scale up coordinates
  const x = row * SCALE_X
  const y = column * SCALE_Y
  const width = SCALE_X
  const height = SCALE_Y

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

export default {
  draw (board, currentPiece) {
    const canvas = document.getElementById('game')
    if (canvas) {
      const context = canvas.getContext('2d')

      clearCanvas(context)
      if (config.drawGuideLines) {
        drawGuideLines(context)
      }
      drawBoard(context, board)
      drawPiece(context, currentPiece)
    }
  }
}
