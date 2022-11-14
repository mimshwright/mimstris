import React from "react";

const ModalText = ({ text, subtext = "" }) => {
  const style = { visibility: text === "" ? "hidden" : "" };
  return (
    <div style={style} className="modalText">
      {text}
      {subtext && (
        <div style={style} className="modalSubText">
          {subtext}
        </div>
      )}
    </div>
  );
};

export default ModalText;
