import React from 'react'
import '../../styles/footer.css'; // Asegúrate de tener este archivo
import logoLoberia from "../../assets/icons/logoLoberia.svg";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { IoLogoYoutube } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
          <img
            className="logoLoberia"
            src={logoLoberia}
            alt="Lobería"
            width="40"
            height="40"
          />
      </div>
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
        <div className="footer__info">
            <div className="footer__item">
              <span>📢</span>
              <p>Suscribite a los newsletter</p>
            </div>

            <div className="footer__social">
              <a href="#"><TiSocialFacebookCircular /></a>
              <a href="#"><TiSocialInstagram /></a>
              <a href="#"><IoLogoYoutube /></a>
              <a href="#"><FaWhatsapp /></a>
              <a href=""><FaTiktok /></a>
            </div>
        </div>
    </footer>
  );
};