import React from "react";
import Button from "react-bootstrap/Button";

const ButtonSuccess = ({ text = "Ver Más" }) => {
  return <Button className="btn-success">{text}</Button>;
};

export default ButtonSuccess;
