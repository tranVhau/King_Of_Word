import React from "react";

function AnswerBtn(props) {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      className={` bg-blue-500 p-4 rounded-lg select-none cursor-pointer hover:bg-blue-400 duration-200 ${
        props.isSelected ? "bg-slate-400 hover:bg-slate-300" : ""
      } ${props.style}`}
    >
      {props.children}
    </button>
  );
}

export default AnswerBtn;
