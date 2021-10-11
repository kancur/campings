import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="125"
      height="125"
      version="1.1"
      viewBox="0 0 125 125"
      {...props}
    >
      <path
        stroke="#000"
        strokeWidth="1"
        d="M0 90c40-5 70 5 125 0v35H0z"
      ></path>
    </svg>
  );
}

export default Icon;
