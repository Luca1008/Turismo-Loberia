import React from "react";
import Button from "react-bootstrap/Button";

/**
 * Componente `ButtonSuccess`
 *
 * Botón estilizado con clase `btn-success` de Bootstrap.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.text="Ver Más"] - Texto que se mostrará en el botón.
 * @param {function} props.onClick - Función a ejecutar al hacer click en el botón.
 *
 * @returns {JSX.Element} Botón de acción con estilo success.
 *
 * @example
 * <ButtonSuccess text="Guardar" onClick={handleSave} />
 *
 * @example
 * <ButtonSuccess onClick={() => console.log("Clicked")} />
 */
const ButtonSuccess = ({ text = "Ver Más", onClick }) => {
  return (
    <Button className="btn-success" onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonSuccess;
