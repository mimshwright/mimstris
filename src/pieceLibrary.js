let id = 0
const createPiece = (name, color, matrix) => {
  id++
  // Map any non-zero values in the matrix to the id number for this piece.
  matrix = matrix.map(row => row.map(value => value === 0 ? 0 : id))

  return {
    name,
    id,
    color,
    matrix,
    x: 0,
    y: 0
  }
}

export default [
  createPiece('T', '#AE81FF',
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  ),
  createPiece('O', '#FF445A',
    [
    [1, 1],
    [1, 1]
    ]
  ),
  createPiece('J', '#F7FF00',
    [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
    ]
  ),
  createPiece('L', '#2753f1',
    [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
    ]
  ),
  createPiece('I', '#FFB900',
    [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
    ]
  ),
  createPiece('S', '#FF6728',
    [
    [0, 1, 1],
    [1, 1, 0]
    ]
  ),
  createPiece('Z', '#11C5BF',
    [
    [1, 1, 0],
    [0, 1, 1]
    ]
  ),
  // createPiece('II', '#ff9e0b',
  //   [
  //     [0, 1, 0],
  //     [0, 1, 0],
  //     [0, 1, 0],
  //     [0, 1, 0],
  //     [0, 1, 0],
  //     [0, 1, 0]
  //   ]
  // )

  //   createPiece('U', '#C0E0B8',
  //   [
  //   [1, 0, 1],
  //   [1, 1, 1],
  //   [0, 0, 0]
  //   ]
  // ),
  //   createPiece('P', '#E6DB74',
  //   [
  //   [0, 0, 0, 0],
  //   [0, 1, 1, 0],
  //   [0, 1, 1, 0],
  //   [0, 1, 0, 0]
  //   ]
  // ),
  //   createPiece('X', '#A6E22E',
  //   [
  //   [0, 1, 0],
  //   [1, 1, 1],
  //   [0, 1, 0]
  //   ]
  // ),
  //   createPiece('OO', '#FF445A',
  //   [
  //   [1, 1, 1],
  //   [1, 0, 1],
  //   [1, 1, 1]
  //   ]
  // ),
  //   createPiece('H', '#FF445A',
  //   [
  //   [1, 0, 1],
  //   [1, 1, 1],
  //   [1, 0, 1]
  //   ]
  // ),
  //   createPiece('Y', '#FF445A',
  //   [
  //   [1, 0, 1],
  //   [1, 1, 1],
  //   [0, 1, 0]
  //   ]
  // )
]
