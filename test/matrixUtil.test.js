import chai from 'chai'
const expect = chai.expect
import * as matrixUtil from '../src/matrixUtil.js'


describe('matrixUtil', () => {
  describe('createEmptyArray()', () => {
    let emptyArray = matrixUtil.createEmptyArray(10)
    expect(emptyArray).to.have.lengthOf(10)
    expect(emptyArray.every(element => element === 0)).to.equal(true)
  })
})
