import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      version="1.1"
      viewBox="0 0 150 150"
      {...props}
    >
      <g>
        <path
          stroke="#000"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="1"
          d="M.857 165.278c0-20 21.821-82.081 28.929-95.29 5.088-9.456 23.134-4.25 40.771-4.601C90 65 108.83 63.569 117 65c7.092 1.242 33.001 75 32.712 108.351C149.588 187.493.857 215.555.857 165.278z"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
