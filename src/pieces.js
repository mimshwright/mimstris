import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _random from 'lodash/random'

import {rotateRight, rotateLeft} from './matrixUtil.js' // combineMatrices

const T = 1
const O = 2
const J = 3
const L = 4
const I = 5
const S = 6
const Z = 7

export function getColorForID (id) {
  return _find(pieces, {id: id}).color
}

export const pieces = [
  {
    name: 'T',
    id: T,
    color: '#FFFF00',
    matrix: [
    [0, 0, 0],
    [T, T, T],
    [0, T, 0]
    ]
  },
  {
    name: 'O',
    id: O,
    color: '#00FFFF',
    matrix: [
    [O, O],
    [O, O]
    ]
  },
  {
    name: 'J',
    id: J,
    color: '#FFFFCC',
    matrix: [
    [0, J, 0],
    [0, J, 0],
    [J, J, 0]
    ]
  },
  {
    name: 'L',
    id: L,
    color: '#00FF00',
    matrix: [
    [0, L, 0],
    [0, L, 0],
    [0, L, L]
    ]
  },
  {
    name: 'I',
    id: I,
    color: '#FF6600',
    matrix: [
    [0, 0, I, 0, 0],
    [0, 0, I, 0, 0],
    [0, 0, I, 0, 0],
    [0, 0, I, 0, 0]
    ]
  },
  {
    name: 'S',
    id: S,
    color: '#6600FF',
    matrix: [
    [0, S, S],
    [S, S, 0]
    ]
  },
  {
    name: 'Z',
    id: Z,
    color: '#FF20CC',
    matrix: [
    [Z, Z, 0],
    [0, Z, Z]
    ]
  }
]

export function clonePiece (piece) {
  let clonedPiece = _cloneDeep(piece)
  clonedPiece.x = clonedPiece.x || 0
  clonedPiece.y = clonedPiece.y || 0
  return clonedPiece
}
export function rotatePieceRight (piece) {
  piece.matrix = rotateRight(piece.matrix)
}
export function rotatePieceLeft (piece) {
  piece.matrix = rotateLeft(piece.matrix)
}
export function movePiece (piece, x = 0, y = 0) {
  piece.x += x
  piece.y += y
}

export function getRandomPiece () {
  const l = pieces.length
  const i = _random(0, l - 1)
  return pieces[i]
}
