import React from 'react';
import '../../styles/footer.css';
import logoLoberia from '../../assets/icons/logoLoberia.svg';

// Íconos sociales
import { TiSocialFacebookCircular } from 'react-icons/ti';
import { TiSocialInstagram } from 'react-icons/ti';
import { IoLogoYoutube } from 'react-icons/io5';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Logo institucional */}
        <div className="footer__logo">
          <img src={logoLoberia} alt="Lobería Gobierno Local" />
          <p>GOBIERNO LOCAL</p>
        </div>

        {/* Información de contacto (2 ítems) */}
        <div className="footer__info">
          <div className="footer__item">
            <span>📧</span>
            <p>Contactate con nosotros</p>
          </div>
          <div className="footer__item">
            <span>📍</span>
            <p>Dirección de Turismo, Av. Campos 500</p>
          </div>
        </div>

        {/* Newsletter + redes sociales */}
        <div className="footer__extra">
          <div className="footer__item">
            <span>📢</span>
            <p>Suscribite a los newsletter</p>
          </div>
          <div className="footer__social">
            <a href="#"><TiSocialFacebookCircular /></a>
            <a href="#"><TiSocialInstagram /></a>
            <a href="#"><IoLogoYoutube /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};


