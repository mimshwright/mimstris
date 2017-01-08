import test from 'tape'
import * as matrixUtil from '../src/matrixUtil.js'

test('matrixUtil', (t) => {
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

  t.end()
})
