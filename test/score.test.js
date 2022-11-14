import test from "ava";
import reducer, * as score from "../src/stores/score.js";

test("reducer", (assert) => {
  const addPieceScore = score.addPieceScore(0);
  const pieceScore = reducer(0, addPieceScore);
  assert.truthy(pieceScore > 0, "piece score is added");
  assert.truthy(
    reducer(0, score.addPieceScore(10)) > pieceScore,
    "piece score is more when level is higher"
  );

  const addLineScore1 = score.addClearedLineScore(1, 0);
  const addLineScore1Level9 = score.addClearedLineScore(1, 9);
  const addLineScore4 = score.addClearedLineScore(4, 0);
  const addLineScore0 = score.addClearedLineScore(0, 0);
  const pointsFrom1Line = reducer(0, addLineScore1);
  const pointsFrom1LineLevel9 = reducer(0, addLineScore1Level9);
  const pointsFrom4Lines = reducer(0, addLineScore4);
  assert.truthy(pointsFrom1Line > 0, "Add points to score when lines added");
  assert.truthy(
    pointsFrom4Lines > pointsFrom1Line,
    "Number of lines affects score"
  );
  assert.truthy(pointsFrom1LineLevel9 > pointsFrom1Line, "Level affects score");
  assert.is(reducer(0, addLineScore0), 0, "No lines should equal 0");

  assert.is(reducer(123, { type: "bogus" }), 123, "default is identity");

  const resetScore = score.resetScore();
  assert.is(reducer(100, resetScore), 0, "Reset sets score back to 0");
});

test("aciton creators", (assert) => {
  assert.is(score.addPieceScore().type, score.ADD_PIECE_SCORE);
  assert.is(score.addClearedLineScore().type, score.ADD_CLEARED_LINE_SCORE);
  assert.is(score.resetScore().type, score.RESET_SCORE);
});

test("selector", (assert) => {
  assert.is(
    score.getScore({ score: 123 }),
    123,
    "getScore() returns the correct value"
  );
});
