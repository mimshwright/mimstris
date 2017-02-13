import _cloneDeep from 'lodash/cloneDeep'
import _inRange from 'lodash/inRange'
import _times from 'lodash/times'
import _constant from 'lodash/constant'
import _partial from 'lodash/partial'

export const getMatrixHeight = matrix => matrix.length

export const getMatrixWidth = matrix => matrix[0].length

export const getMatrixSize = matrix => ({ width: getMatrixWidth(matrix), height: getMatrixHeight(matrix) })

export const createEmptyArray = length => _times(length, _constant(0))

export const removeRow = (matrix, rowIndex) => {
  matrix = _cloneDeep(matrix)
  matrix.splice(rowIndex, 1)
  return matrix
}

export const removeColumn = (matrix, columnIndex) => {
  return matrix.map((row, rowIndex) => {
    row = _cloneDeep(row)
    row.splice(columnIndex, 1)
    return row
  })
}

export const removeRowAndShiftRemaining = (matrix, rowIndex) => {
  createEmptyArray(getMatrixWidth(matrix)).concat(removeRow(matrix, rowIndex))
  let W = getMatrixWidth(matrix)
  let emptyRowMatrix = [createEmptyArray(W)]
  return emptyRowMatrix.concat(removeRow(matrix, rowIndex))
}

export const createEmptyMatrix = (width, height) => {
  const columns = createEmptyArray(height)
  const createRow = _partial(createEmptyArray, width)
  return columns.map(createRow)
}

export const detectCollision = (destinationMatrix, sourceMatrix, offsetX = 0, offsetY = 0) => {
  const {width: sourceWidth, height: sourceHeight} = getMatrixSize(sourceMatrix)
  const {width: destinationWidth, height: destinationHeight} = getMatrixSize(destinationMatrix)

  for (let sourceY = 0; sourceY < sourceHeight; sourceY++) {
    for (let sourceX = 0; sourceX < sourceWidth; sourceX++) {
      if (sourceMatrix[sourceY][sourceX] !== 0) {
        const destinationX = sourceX + offsetX
        const destinationY = sourceY + offsetY
        if (_inRange(destinationX, 0, destinationWidth) &&
          _inRange(destinationY, 0, destinationHeight)) {
          if (destinationMatrix[destinationY][destinationX] !== 0) {
            return true
          }
        } else { // piece is out of bounds
          return true
        }
      }
    }
  }

  return false
}

export const combineMatrices = (destinationMatrix, sourceMatrix, offsetX = 0, offsetY = 0, overwrite = true) => {
  if (!getMatrixHeight(sourceMatrix) || !getMatrixWidth(sourceMatrix) ||
      !getMatrixHeight(destinationMatrix) || !getMatrixWidth(destinationMatrix)) {
    throw new Error('\'sourceMatrix\' and \'destinationMatrix\' must be arrays with length > 0 containing arrays with length > 0.')
  }

  const lastXIndex = getMatrixWidth(sourceMatrix) + offsetX - 1
  const lastYIndex = getMatrixHeight(sourceMatrix) + offsetY - 1

  const newMatrix = destinationMatrix.map((rows, y) => {
    return rows.map((value, x) => {
      if (_inRange(x, offsetX, lastXIndex + 1) &&
          _inRange(y, offsetY, lastYIndex + 1)) {
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

export const mirror = matrix => matrix.map(row => row.reverse())

export const rotateRight = (matrix) => {
  return mirror(flip(matrix))
}

export const rotateLeft = (matrix) => {
  return flip(matrix).reverse()
}

export const rotate = (matrix, direction) => {
  if (direction && (direction <= 0 || direction.toString().toLowerCase() === 'left')) {
    return rotateLeft(matrix)
  }
  return rotateRight(matrix)
}
