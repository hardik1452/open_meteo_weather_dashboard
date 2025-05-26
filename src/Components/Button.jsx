import React from "react";

const Button = ({ text, onClick,disabled=false, className = "" }) => {
  return (
    <button
      className={`m-2 ml-0 px-4 py-2 rounded-md hover:cursor-pointer ${className}`}
      onClick={onClick} disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
