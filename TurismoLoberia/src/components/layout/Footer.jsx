import React from "react";
import logoLoberiaFooter from "../../assets/icons/logoLoberiaFooter.svg";
import "../../styles/footer.css";

// Íconos - Todos de Font Awesome para consistencia
import {
  FaBell,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo institucional */}
        <div className="footer__logo">
          <img src={logoLoberiaFooter} alt="Lobería Gobierno Local" />
        </div>

        {/* Información de contacto (2 ítems) */}
        <div className="footer__info">
          <div className="footer__item">
            <FaEnvelope />
            <p>Contactate con nosotros</p>
          </div>
          <div className="footer__item">
            <FaMapMarkerAlt />
            <p>Dirección de Turismo, Av. Campos 500</p>
          </div>
        </div>

        {/* Newsletter + redes sociales */}
        <div className="footer__extra">
          <div className="footer__item">
            <FaBell />
            <p>Suscribite a los newsletter</p>
          </div>
          <div className="footer__social">
            <a href="#">
              <FaFacebook className="svg-social"/>
            </a>
            <a href="#">
              <FaInstagram className="svg-social" />
            </a>
            <a href="#">
              <FaYoutube className="svg-social" />
            </a>
            <a href="#">
              <FaWhatsapp className="svg-social" />
            </a>
            <a href="#">
              <FaTiktok className="svg-social" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
