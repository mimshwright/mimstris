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

  t.end()
})
