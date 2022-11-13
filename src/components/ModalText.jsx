import React from "react";

const ModalText = ({ text }) => {
  const style = { visibility: text === "" ? "hidden" : "" };
  return (
    <div style={style} className="modalText">
      {text}
    </div>
  );
};

export default ModalText;
