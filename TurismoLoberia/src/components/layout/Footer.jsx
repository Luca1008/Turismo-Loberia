import React from 'react';
import '../../styles/footer.css'; // Estilos del footer
import logoLoberia from '../../assets/icons/logoLoberia.svg'; // Logo desde assets

// Íconos de redes sociales desde react-icons
import { TiSocialFacebookCircular } from 'react-icons/ti';
import { TiSocialInstagram } from 'react-icons/ti';
import { IoLogoYoutube } from 'react-icons/io5';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

// Componente Footer principal
export const Footer = () => {
  return (
    <footer className="footer">
      {/* Contenedor general para estructurar en columnas o filas */}
      <div className="footer__container">

        {/* LOGO + texto debajo (GOBIERNO LOCAL) */}
        <div className="footer__logo">
          <img src={logoLoberia} alt="Lobería" />
        </div>

        {/* Información de contacto (íconos + texto) */}
        <div className="footer__info">
          <div className="footer__item">
            <span>📧</span>
            <p>Contactate con nosotros</p>
          </div>
          <div className="footer__item">
            <span>📍</span>
            <p>Dirección de Turismo, Av. Campos 500</p>
          </div>
          <div className="footer__item">
            <span>📢</span>
            <p>Suscribite a los newsletter</p>
          </div>
        </div>

        {/* Íconos de redes sociales */}
        <div className="footer__social">
          <a href="#"><TiSocialFacebookCircular /></a>
          <a href="#"><TiSocialInstagram /></a>
          <a href="#"><IoLogoYoutube /></a>
          <a href="#"><FaWhatsapp /></a>
          <a href="#"><FaTiktok /></a>
        </div>
      </div>
    </footer>
  );
};

