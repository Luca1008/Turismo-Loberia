import React from "react";

const ButtonSubmit = ({ text, disabled = false, className = "" }) => {
  return (
    <button type="submit" disabled={disabled} className={className }>
      {text}
    </button>
  );
};

export default ButtonSubmit; 