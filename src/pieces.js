import random from 'lodash/fp/random'

const T = 1
const O = 2
const J = 3
const L = 4
const I = 5
const S = 6
const Z = 7

export const pieces = [
  {
    name: 'T',
    color: '#FFFF00',
    pattern: [
    [0, 0, 0],
    [T, T, T],
    [0, T, 0]
    ]
  },
  {
    name: 'O',
    color: '#00FFFF',
    pattern: [
    [O, O],
    [O, O]
    ]
  },
  {
    name: 'J',
    color: '#FFFFCC',
    pattern: [
    [0, J, 0],
    [0, J, 0],
    [J, J, 0]
    ]
  },
  {
    name: 'L',
    color: '#00FF00',
    pattern: [
    [0, L, 0],
    [0, L, 0],
    [0, L, L]
    ]
  },
  {
    name: 'I',
    color: '#112233',
    pattern: [
    [0, 0, I, 0],
    [0, 0, I, 0],
    [0, 0, I, 0],
    [0, 0, I, 0]
    ]
  },
  {
    name: 'S',
    color: '#6600FF',
    pattern: [
    [0, S, S],
    [S, S, 0]
    ]
  },
  {
    name: 'Z',
    color: '#999999',
    pattern: [
    [Z, Z, 0],
    [0, Z, Z]
    ]
  }
]

export const getRandomPiece = () => {
  const l = pieces.length
  const i = random(0, l - 1)
  return pieces[i]
}
