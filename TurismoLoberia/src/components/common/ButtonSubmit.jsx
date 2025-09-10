import React from "react";

/**
 * Componente `ButtonSubmit`
 *
 * Botón de envío de formulario configurable.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.text - Texto que se mostrará en el botón.
 * @param {boolean} [props.disabled=false] - Indica si el botón está deshabilitado.
 * @param {string} [props.className=""] - Clases CSS adicionales para personalizar el botón.
 *
 * @returns {JSX.Element} Botón de tipo submit.
 *
 * @example
 * <ButtonSubmit text="Enviar" />
 *
 * @example
 * <ButtonSubmit text="Guardar" disabled={true} className="btn-primary" />
 */
const ButtonSubmit = ({ text, disabled = false, className = "" }) => {
  return (
    <button type="submit" disabled={disabled} className={className}>
      {text}
    </button>
  );
};

export default ButtonSubmit;
