import chai from 'chai'
const expect = chai.expect
import * as matrixUtil from '../src/matrixUtil.js'

describe('matrixUtil', () => {
  describe('createEmptyArray()', () => {
    let emptyArray = matrixUtil.createEmptyArray(10)
    expect(emptyArray).to.have.lengthOf(10)
    expect(emptyArray.every(element => element === 0)).to.equal(true)
  })

  describe('createEmptyMatrix()', () => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    expect(emptyMatrix).to.have.lengthOf(6)
    expect(emptyMatrix.every(row => row.length === 4)).to.equal(true)
    expect(emptyMatrix[0].every(element => element === 0)).to.equal(true)
  })

  describe('getMatrixWidth()', () => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    expect(matrixUtil.getMatrixWidth(emptyMatrix)).to.equal(4)
  })

  describe('getMatrixHeight()', () => {
    let emptyMatrix = matrixUtil.createEmptyMatrix(4, 6)
    expect(matrixUtil.getMatrixHeight(emptyMatrix)).to.equal(6)
  })
})
