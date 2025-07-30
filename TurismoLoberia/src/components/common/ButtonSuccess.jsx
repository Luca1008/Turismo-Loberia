import React from "react";
import Button from "react-bootstrap/Button";

const ButtonSuccess = ({ text = "Ver Más", onClick }) => {
  return <Button className="btn-success" onClick={onClick}>{text}</Button>;
};

export default ButtonSuccess;
