import _cloneDeep from "lodash/fp/cloneDeep.js";
import { rotate, detectCollision, getMatrixWidth } from "../matrixUtil.js";
import { REPLACE_STATE } from "./replaceState.js";

export const SET_CURRENT_PIECE = "SET_CURRENT_PIECE";
export const setCurrentPiece = (piece) => ({
  type: SET_CURRENT_PIECE,
  piece,
});

export const ROTATE_CURRENT_PIECE = "ROTATE_CURRENT_PIECE";
export const ROTATION_DIRECTION_RIGHT = "right";
export const ROTATION_DIRECTION_LEFT = "left";
export const rotateRight = (board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_RIGHT,
  board,
});
export const rotateLeft = (board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction: ROTATION_DIRECTION_LEFT,
  board,
});
export const rotateCurrentPiece = (direction, board) => ({
  type: ROTATE_CURRENT_PIECE,
  direction,
  board,
});

export const OFFSET_X_AND_CHECK = "OFFSET_X_AND_CHECK";
export const movePieceLeft = (board) => ({
  type: OFFSET_X_AND_CHECK,
  distance: -1,
  board,
});
export const movePieceRight = (board) => ({
  type: OFFSET_X_AND_CHECK,
  distance: 1,
  board,
});

export const MOVE_PIECE_DOWN = "MOVE_PIECE_DOWN";
export const movePieceDown = () => ({
  type: MOVE_PIECE_DOWN,
});

export const SET_X = "SET_X";
export const setX = (x) => ({
  type: SET_X,
  x,
});

const initialState = null;

export default function reducer(previousPiece = initialState, action) {
  let newPiece;

  switch (action.type) {
    case REPLACE_STATE:
      return getCurrentPiece(action.payload);
    case SET_CURRENT_PIECE:
      return action.piece;
    case ROTATE_CURRENT_PIECE:
      const { board, direction } = action;
      if (!board) {
        throw new Error(
          "The action '" +
            action.type +
            "' must provide a value called 'board'."
        );
      }
      newPiece = _cloneDeep(previousPiece);
      newPiece.matrix = rotate(newPiece.matrix, direction);
      const pieceWidth = getMatrixWidth(newPiece.matrix);

      // validate rotation. Attempt to fit the piece within the other
      // blocks around it. If it fails, cancel the rotation
      let offsetX = 1;

      while (detectCollision(board, newPiece.matrix, newPiece.x, newPiece.y)) {
        newPiece.x += offsetX;

        // flip direction and add one square after trying left and right
        if (offsetX > 0) {
          offsetX = -offsetX;
        } else {
          offsetX = -offsetX + 1;
        }

        if (Math.abs(offsetX) > Math.ceil(pieceWidth / 2)) {
          // validation failed. piece doesn't fit.
          return previousPiece;
        }
      }
      return newPiece;

    case SET_X:
      newPiece = _cloneDeep(previousPiece);
      newPiece.x = action.x;
      return newPiece;
    case OFFSET_X_AND_CHECK:
      newPiece = _cloneDeep(previousPiece);
      newPiece.x += action.distance;
      if (
        detectCollision(action.board, newPiece.matrix, newPiece.x, newPiece.y)
      ) {
        return previousPiece;
      }
      return newPiece;
    case MOVE_PIECE_DOWN:
      newPiece = _cloneDeep(previousPiece);
      newPiece.y += 1;
      return newPiece;

    default:
      return previousPiece;
  }
}

export const getCurrentPiece = (state) => state.currentPiece;
