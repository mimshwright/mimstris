import test from 'ava'
import * as matrixUtil from '../src/matrixUtil.js'

const mockMatrix = [[0, 0, 0], [0, 1, 0], [1, 1, 1]]

test('createEmptyArray()', (assert) => {
  let emptyArray = matrixUtil.createEmptyArray(10)
  assert.is(emptyArray.length, 10, 'Contains n elements, where n is the first parameter')
  assert.truthy(emptyArray.every(element => element === 0), 'All elements should be 0')

  emptyArray = matrixUtil.createEmptyArray(0)
  assert.is(emptyArray.length, 0, 'Creating totally empty (length=0) arrays is ok.')
})

test('createEmptyMatrix()', (assert) => {
  let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
  assert.truthy(emptyMatrix.every(row => row.length === 4), 'First parameter is the "width" of the Matrix')
  assert.is(emptyMatrix.length, 6, 'First parameter is the "height" of the Matrix')
  assert.truthy(emptyMatrix[0].every(element => element === 0), 'Creates rows of 0')
})

test('getMatrixWidth()', (assert) => {
  let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
  assert.is(matrixUtil.getMatrixWidth(emptyMatrix), 4)
})

test('getMatrixHeight()', (assert) => {
  let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
  assert.is(matrixUtil.getMatrixHeight(emptyMatrix), 6)
})

test('getMatrixSize()', (assert) => {
  let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
  const {width, height} = matrixUtil.getMatrixSize(emptyMatrix)
  assert.is(width, 4, 'Returns and object with correct width')
  assert.is(height, 6, 'Returns and object with correct height')
})

test('getFullRows()', (assert) => {
  let matrix = [
    [0, 0, 0],
    [1, 2, 3],
    [1, 2, 0],
    [1, 2, null],
    ['foo', 1, 2]
  ]
  let expected = [1]

  assert.deepEqual(matrixUtil.getFullRows(matrix), expected, 'getFullRows() returns and array of the row indeces that have all non-zero numeric values')

  matrix = [
    [0, 0],
    [0, 0]
  ]
  expected = []

  assert.deepEqual(matrixUtil.getFullRows(matrix), expected, 'getFullRows() returns an empty array if no rows are full')
})

test('removeRow()', (assert) => {
  assert.is(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix has 3 rows')
  let testMatrix = matrixUtil.removeRow(mockMatrix, 1)
  assert.pass('Removing row at index 1 from a 3x3 matrix')
  assert.is(matrixUtil.getMatrixHeight(testMatrix), 2, 'Removed 1 row')
  assert.truthy(testMatrix[0].every(val => val === 0), 'Row 0 unchanged')
  assert.truthy(testMatrix[1].every(el => el === 1), 'Row 2 is now row 1.')
  assert.is(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix is unmodified')
})

test('removeColumn()', (assert) => {
  assert.is(matrixUtil.getMatrixWidth(mockMatrix), 3, 'mockMatrix has 3 columns')
  let testMatrix = matrixUtil.removeColumn(mockMatrix, 1)
  assert.pass('Removing column at index 1 from a 3x3 matrix')
  assert.is(matrixUtil.getMatrixWidth(testMatrix), 2, 'Removed 1 column')
  assert.truthy(testMatrix[1].every(val => val === 0), 'Removed the single 1 from middle row')
  assert.is(matrixUtil.getMatrixWidth(mockMatrix), 3, 'mockMatrix is unmodified')
})

test('removeRowAndShiftRemaining()', (assert) => {
  assert.is(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix has 3 rows')
  let testMatrix = matrixUtil.removeRowAndShiftRemaining(mockMatrix, 1)
  assert.pass('Removing row at index 1 from a 3x3 matrix and shifting')
  assert.is(matrixUtil.getMatrixHeight(testMatrix), 3, 'Removed 1 row but height is same')
  assert.truthy(testMatrix[0].every(val => val === 0), 'Row 0 is a new empty row of 0s')
  assert.truthy(testMatrix[1].every(val => val === 0), 'Row 0 unchanged but now in position 1')
  assert.truthy(testMatrix[2].every(el => el === 1), 'Row 2 is unchanged.')
  assert.is(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix is unmodified')
})

test('combineMatrices()', (assert) => {
  let a = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ]
  let b = [
    [2, 2],
    [2, 2]
  ]

  let combined = matrixUtil.combineMatrices(a, b, 1, 1)
  let expected = [
    [1, 1, 0],
    [1, 2, 2],
    [0, 2, 2]
  ]
  assert.deepEqual(combined, expected, 'Combines correctly.')

  combined = matrixUtil.combineMatrices(a, b, 1, 1, false)
  expected = [
    [1, 1, 0],
    [1, 1, 2],
    [0, 2, 2]
  ]
  assert.deepEqual(combined, expected, "Combines correctly. If 5th param is false, doesn't overwrite non-zero values")

  assert.throws(assert => { matrixUtil.combineMatrices(a, [[]], 0, 0) }, Error, 'Bogus matrices throw errors.')
})

test('detectCollision', (assert) => {
  let a = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [2, 0, 2, 2, 0, 0, 0, 0]
  ]
  let b = [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
  const f = matrixUtil.detectCollision

  assert.truthy(f(a, b) === false, "Doesn't detect collision with values set to 0. By default, offsets are 0")
  assert.truthy(f(a, b, 1, 1), 'Detect collision with values set to non-zero.')
  assert.truthy(f(a, b, -1, 0), 'Going outside of x boundaries to the left is considered collision.')
  assert.truthy(f(a, b, 6, 0), 'Going outside of x boundaries to the right is considered collision.')
  assert.truthy(f(a, b, 4, 3), 'Going outside of y boundaries is considered collision.')
  assert.truthy(f(a, b, 4, 0) === false, 'Going outside of x boundaries with only 0 values is NOT considered collision.')
  assert.truthy(f(a, b, 5, 0) === false, 'Going outside of x boundaries with only 0 values is NOT considered collision.')
  assert.truthy(f(a, b, 4, 1) === false, 'Going outside of y boundaries with only 0 values is NOT considered collision.')
  assert.truthy(f(a, b, 1, 0) === false, 'Collision with only 0 values is NOT considered collision.')

  a = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 2, 0],
    [2, 2, 0, 0]
  ]
  b = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ]
  assert.truthy(f(a, b, 2, 0), 'Do detect collision when pieces overlap.')
  assert.truthy(f(a, b, 2, 1) === false, 'Don\'t detect collision when pieces don\'t overlap.')
})

test('flip()', (assert) => {
  let flipped = matrixUtil.flip([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0]
  ])
  let expected = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
  ]
  let msg = 'Values flipped as expected'
  assert.deepEqual(flipped, expected, msg)
})

test('mirror()', (assert) => {
  let mirrored = matrixUtil.mirror([
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ])
  let expected = [
    [0, 0, 1],
    [1, 1, 0],
    [0, 1, 1]
  ]
  let msg = 'Values mirrored as expected'
  assert.deepEqual(mirrored, expected, msg)
})

test('rotateLeft()', (assert) => {
  let rotated = matrixUtil.rotateLeft([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0]
  ])
  let expected = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 1]
  ]
  let msg = 'Values rotated as expected'
  assert.deepEqual(rotated, expected, msg)
})

test('rotateRight()', (assert) => {
  let rotated = matrixUtil.rotateRight([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0]
  ])
  let expected = [
    [1, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
  ]
  let msg = 'Values rotated as expected'
  assert.deepEqual(rotated, expected, msg)
})

test('rotate()', (assert) => {
  let matrix = (
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0]
  )

  assert.deepEqual(matrixUtil.rotate(matrix, 'right'), matrixUtil.rotateRight(matrix), 'rotate() is another way to call rotateRight() depending on a string')
  assert.deepEqual(matrixUtil.rotate(matrix, 'left'), matrixUtil.rotateLeft(matrix), 'rotate() is another way to call rotateLeft() depending on a string')
  assert.deepEqual(matrixUtil.rotate(matrix, 1), matrixUtil.rotateRight(matrix), 'rotate() can use a positive number to rotate right')
  assert.deepEqual(matrixUtil.rotate(matrix, -1), matrixUtil.rotateLeft(matrix), 'rotate() can use a negative number to rotate left')
  assert.deepEqual(matrixUtil.rotate(matrix), matrixUtil.rotateRight(matrix), 'rotate() by default rotates to the right')
})
