import _cloneDeep from 'lodash/fp/cloneDeep'
import _find from 'lodash/fp/find'
import _random from 'lodash/fp/random'

const T = 1
const O = 2
const J = 3
const L = 4
const I = 5
const S = 6
const Z = 7
// const U = 8
// const P = 9
// const X = 10

export function getColorForID (id) {
  return _find({id: id})(pieces).color
}

export const pieces = [
  {
    name: 'T',
    id: T,
    color: '#AE81FF',
    matrix: [
    [0, 0, 0],
    [T, T, T],
    [0, T, 0]
    ]
  },
  {
    name: 'O',
    id: O,
    color: '#FF445A',
    matrix: [
    [O, O],
    [O, O]
    ]
  },
  {
    name: 'J',
    id: J,
    color: '#F7FF00',
    matrix: [
    [0, J, 0],
    [0, J, 0],
    [J, J, 0]
    ]
  },
  {
    name: 'L',
    id: L,
    color: '#7480ec',
    matrix: [
    [0, L, 0],
    [0, L, 0],
    [0, L, L]
    ]
  },
  {
    name: 'I',
    id: I,
    color: '#FFB900',
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
    color: '#FF6728',
    matrix: [
    [0, S, S],
    [S, S, 0]
    ]
  },
  {
    name: 'Z',
    id: Z,
    color: '#11C5BF',
    matrix: [
    [Z, Z, 0],
    [0, Z, Z]
    ]
  } // ,
  // {
  //   name: 'U',
  //   id: U,
  //   color: '#C0E0B8',
  //   matrix: [
  //   [U, 0, U],
  //   [U, U, U],
  //   [0, 0, 0]
  //   ]
  // },
  // {
  //   name: 'P',
  //   id: P,
  //   color: '#E6DB74',
  //   matrix: [
  //   [0, 0, 0, 0],
  //   [0, P, P, 0],
  //   [0, P, P, 0],
  //   [0, P, 0, 0]
  //   ]
  // },
  // {
  //   name: 'X',
  //   id: X,
  //   color: '#A6E22E',
  //   matrix: [
  //   [0, X, 0],
  //   [X, X, X],
  //   [0, X, 0]
  //   ]
  // }
]

export function clonePiece (piece) {
  let clonedPiece = _cloneDeep(piece)
  clonedPiece.x = clonedPiece.x || 0
  clonedPiece.y = clonedPiece.y || 0
  return clonedPiece
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
