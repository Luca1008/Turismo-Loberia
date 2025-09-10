import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/stickyButton.css";

/**
 * Componente `Whatsapp`
 *
 * Botón flotante que abre WhatsApp en una nueva pestaña para contactar
 * a un número predefinido.
 *
 * @component
 *
 * @returns {JSX.Element} Botón flotante de WhatsApp.
 *
 * @example
 * <Whatsapp />
 */
const Whatsapp = () => {
  /**
   * Abre WhatsApp en una nueva ventana para el número especificado.
   */
  const openWhatsApp = () => {
    window.open("https://wa.me/542266123456", "_blank");
  };

  return (
    <div className="floating-buttons">
      <button
        className="whatsapp-button"
        onClick={openWhatsApp}
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default Whatsapp;
