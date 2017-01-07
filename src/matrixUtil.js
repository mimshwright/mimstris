import _cloneDeep from 'lodash/cloneDeep'
import _inRange from 'lodash/inRange'
import _times from 'lodash/times'
import _constant from 'lodash/constant'
import _partial from 'lodash/partial'

export const getMatrixHeight = matrix => matrix.length

export const getMatrixWidth = matrix => matrix[0].length

export const createEmptyArray = length => _times(length, _constant(0))

export const removeRow = (matrix, rowIndex) => {
  matrix = _cloneDeep(matrix)
  matrix.splice(rowIndex, 1)
  return matrix
}

export const removeRowAndShiftRemaining = (matrix, rowIndex) => {
  let W = getMatrixWidth(matrix)
  let emptyRowMatrix = [createEmptyArray(W)]
  return emptyRowMatrix.concat(removeRow(matrix, rowIndex))
}

export const createEmptyMatrix = (width, height) => {
  const columns = createEmptyArray(height)
  const createRow = _partial(createEmptyArray, width)
  return columns.map(createRow)
}

export const combineMatrices = (destinationMatrix, sourceMatrix, offsetX, offsetY, overwrite = true) => {
  if (!getMatrixHeight(sourceMatrix) || !getMatrixWidth(sourceMatrix) ||
      !getMatrixHeight(destinationMatrix) || !getMatrixWidth(destinationMatrix)) {
    throw new Error('\'sourceMatrix\' and \'destinationMatrix\' must be arrays with length > 0 containing arrays with length > 0.')
  }

  const lastYIndex = getMatrixHeight(sourceMatrix) + offsetY - 1
  const lastXIndex = getMatrixWidth(sourceMatrix) + offsetX - 1

  if (_inRange(lastYIndex, 0, getMatrixHeight(destinationMatrix)) === false ||
      _inRange(lastXIndex, 0, getMatrixWidth(destinationMatrix)) === false) {
    throw new Error('\'pattern\' is out of bounds.')
  }

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

export const rotateRight = (matrix) => {
  return flip(matrix).map(row => row.reverse())
}

export const rotateLeft = (matrix) => {
  return flip(matrix).reverse()
}
