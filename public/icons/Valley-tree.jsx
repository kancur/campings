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
        d="M0 70c50 20 40.627 50.985 65 50 20.627.985 30-35 60-35v40H0z"
      ></path>
    </svg>
  );
}

export default Icon;
