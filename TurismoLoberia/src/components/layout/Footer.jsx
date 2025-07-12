import React from "react";
import { Link } from "react-router-dom";
import logoLoberiaFooter from "../../assets/icons/logoLoberiaFooter.svg";
import "../../styles/footer.css";
import handleExternalLink from "../common/handleExternalLink";

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
        <Link to="/" className="text-decoration-none">
          <div className="footer__logo">
            <img src={logoLoberiaFooter} alt="Lobería Gobierno Local" />
          </div>
        </Link>

        {/* Información de contacto (2 ítems) */}
        <div className="footer__info">
          <Link to="/Contacto" className="text-decoration-none">
            <div className="footer__item">
              <FaEnvelope />
              <p>Contactate con nosotros</p>
            </div>
          </Link>
          <div className="footer__item">
            <FaMapMarkerAlt />
            <p>Dirección de Turismo, Av. Campos 500</p>
          </div>
        </div>

        {/* Newsletter + redes sociales */}
        <div className="footer__extra">
          <Link to="/Suscribirse" className="text-decoration-none">
            <div className="footer__item">
              <FaBell />
              <p>Suscribite a los newsletter</p>
            </div>
          </Link>
          <div className="footer__social">
            <a href="https://www.facebook.com/loberiaturismo" onClick={e => handleExternalLink(e, "https://www.facebook.com/loberiaturismo") }>
              <FaFacebook className="svg-social"/>
            </a>
            <a href="https://www.instagram.com/turismoloberia" onClick={e => handleExternalLink(e, "https://www.instagram.com/turismoloberia") }>
              <FaInstagram className="svg-social" />
            </a>
            <a href="https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA" onClick={e => handleExternalLink(e, "https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA") }>
              <FaYoutube className="svg-social" />
            </a>
            <a href="#" onClick={e => handleExternalLink(e, "#") }>
              <FaWhatsapp className="svg-social" />
            </a>
            <a href="#" onClick={e => handleExternalLink(e, "#") }>
              <FaTiktok className="svg-social" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
