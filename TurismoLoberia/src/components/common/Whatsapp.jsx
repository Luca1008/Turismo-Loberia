import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/stickyButton.css";

const Whatsapp = () => {
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
