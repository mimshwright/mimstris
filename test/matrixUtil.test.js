import test from 'tape'
import * as matrixUtil from '../src/matrixUtil.js'

test('matrixUtil', (t) => {
  const mockMatrix = [[0, 0, 0], [0, 1, 0], [1, 1, 1]]

  test('createEmptyArray()', (assert) => {
    let emptyArray = matrixUtil.createEmptyArray(10)
    assert.equal(emptyArray.length, 10, 'Contains n elements, where n is the first parameter')
    assert.ok(emptyArray.every(element => element === 0), 'All elements should be 0')

    emptyArray = matrixUtil.createEmptyArray(0)
    assert.equal(emptyArray.length, 0, 'Creating totally empty (length=0) arrays is ok.')

    assert.end()
  })

  test('createEmptyMatrix()', (assert) => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    assert.ok(emptyMatrix.every(row => row.length === 4), 'First parameter is the "width" of the Matrix')
    assert.equal(emptyMatrix.length, 6, 'First parameter is the "height" of the Matrix')
    assert.ok(emptyMatrix[0].every(element => element === 0), 'Creates rows of 0')

    assert.end()
  })

  test('getMatrixWidth()', (assert) => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    assert.equal(matrixUtil.getMatrixWidth(emptyMatrix), 4)

    assert.end()
  })

  test('getMatrixHeight()', (assert) => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    assert.equal(matrixUtil.getMatrixHeight(emptyMatrix), 6)

    assert.end()
  })

  test('removeRow()', (assert) => {
    assert.equal(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix has 3 rows')
    let testMatrix = matrixUtil.removeRow(mockMatrix, 1)
    assert.comment('Removing row at index 1 from a 3x3 matrix')
    assert.equal(matrixUtil.getMatrixHeight(testMatrix), 2, 'Removed 1 row')
    assert.ok(testMatrix[0].every(val => val === 0), 'Row 0 unchanged')
    assert.ok(testMatrix[1].every(el => el === 1), 'Row 2 is now row 1.')
    assert.equal(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix is unmodified')

    assert.end()
  })

  test('removeColumn()', (assert) => {
    assert.equal(matrixUtil.getMatrixWidth(mockMatrix), 3, 'mockMatrix has 3 columns')
    let testMatrix = matrixUtil.removeColumn(mockMatrix, 1)
    assert.comment('Removing column at index 1 from a 3x3 matrix')
    assert.equal(matrixUtil.getMatrixWidth(testMatrix), 2, 'Removed 1 column')
    assert.ok(testMatrix[1].every(val => val === 0), 'Removed the single 1 from middle row')
    assert.equal(matrixUtil.getMatrixWidth(mockMatrix), 3, 'mockMatrix is unmodified')

    assert.end()
  })

  test('removeRowAndShiftRemaining()', (assert) => {
    assert.equal(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix has 3 rows')
    let testMatrix = matrixUtil.removeRowAndShiftRemaining(mockMatrix, 1)
    assert.comment('Removing row at index 1 from a 3x3 matrix and shifting')
    assert.equal(matrixUtil.getMatrixHeight(testMatrix), 3, 'Removed 1 row but height is same')
    assert.ok(testMatrix[0].every(val => val === 0), 'Row 0 is a new empty row of 0s')
    assert.ok(testMatrix[1].every(val => val === 0), 'Row 0 unchanged but now in position 1')
    assert.ok(testMatrix[2].every(el => el === 1), 'Row 2 is unchanged.')
    assert.equal(matrixUtil.getMatrixHeight(mockMatrix), 3, 'mockMatrix is unmodified')

    assert.end()
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

    assert.end()
  })

  test('detectCollision', (assert) => {
    let destinationMatrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0],
      [2, 0, 2, 2, 0, 0, 0]
    ]
    let sourceMatrix = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ]

    assert.ok(matrixUtil.detectCollision(destinationMatrix, sourceMatrix) === false, "Doesn't detect collision with values set to 0. By default, offsets are 0")
    assert.ok(matrixUtil.detectCollision(destinationMatrix, sourceMatrix, 1, 1), 'Detect collision with values set to non-zero.')
    assert.ok(matrixUtil.detectCollision(destinationMatrix, sourceMatrix, -1, 0), 'Going outside of x boundaries is considered collision.')
    assert.ok(matrixUtil.detectCollision(destinationMatrix, sourceMatrix, 4, 3), 'Going outside of y boundaries is considered collision.')
    assert.ok(matrixUtil.detectCollision(destinationMatrix, sourceMatrix, 1, 0) === false, '0 values going outside of y boundaries is NOT considered collision.')

    assert.end()
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

    assert.end()
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

    assert.end()
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

    assert.end()
  })

  t.end()
})
