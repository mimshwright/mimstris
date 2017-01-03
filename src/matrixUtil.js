import _inRange from 'lodash/inRange'
import _times from 'lodash/times'
import _constant from 'lodash/constant'
import _partial from 'lodash/partial'

export const createEmptyArray = (length) => {
  return _times(length, _constant(0))
}

export const createEmptyMatrix = (width, height) => {
  const columns = createEmptyArray(height)
  const createRow = _partial(createEmptyArray, width)
  return columns.map(createRow)
}

export const combineMatrices = (sourceMatrix, destinationMatrix, offsetX, offsetY, overwrite = true) => {
  if (offsetX < 0 || offsetY < 0) {
    throw new Error('Offset position is out of bounds.')
  }

  if (!sourceMatrix.length || !sourceMatrix[0].length ||
      !destinationMatrix.length || !destinationMatrix[0].length) {
    throw new Error('\'sourceMatrix\' and \'destinationMatrix\' must be arrays with length > 0 containing arrays with length > 0.')
  }

  const lastYPosition = sourceMatrix.length + offsetY
  const lastXPosition = sourceMatrix[0].length + offsetX

  if (_inRange(lastYPosition, 0, destinationMatrix.length) === false ||
      _inRange(lastXPosition, 0, destinationMatrix[0].length) === false) {
    throw new Error('\'pattern\' is out of bounds.')
  }

  const newMatrix = destinationMatrix.map((rows, y) => {
    return rows.map((value, x) => {
      if (_inRange(x, offsetX, lastXPosition) &&
          _inRange(y, offsetY, lastYPosition)) {
        if (overwrite || !value) {
          return sourceMatrix[y - offsetY][x - offsetX]
        }
      }
      return value
    })
  })

  return newMatrix
}

export const flip = (matrix) => {
  const H = matrix.length
  const W = matrix[0].length

  let newMatrix = createEmptyMatrix(H, W)

  _times(H, (row) => {
    _times(W, (column) => {
      newMatrix[column][row] = matrix[row][column]
    })
  })
  return newMatrix
}

export const rotateRight = (matrix) => {
  return flip(matrix).map(row => row.reverse())
}

export const rotateLeft = (matrix) => {
  return flip(matrix).reverse()
}
