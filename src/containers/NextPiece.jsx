import React from "react";
import { connect } from "react-redux";
import { getNextPiece } from "../stores/nextPiece.js";
import { getShowNextPiece } from "../stores/config.js";

import Piece from "../components/Piece";

const mapStateToProps = (state) => ({
  piece: getNextPiece(state),
  showNextPiece: getShowNextPiece(state),
});

const NextPiece = (props) => {
  const visibility = props.showNextPiece ? "visible" : "hidden";
  const style = { visibility: visibility };

  return (
    <div className="nextPiece" style={style}>
      <div>Next...</div>
      <Piece {...props} />
    </div>
  );
};

export default connect(mapStateToProps)(NextPiece);
