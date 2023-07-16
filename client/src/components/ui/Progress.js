import React from "react";

function Progress(props) {
  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className={`${props.style} text-md text-xs font-medium  text-center p-0.5 leading-none rounded-full`}
        style={{ width: `${props.progress}%`, transition: "width 2s" }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Progress;
