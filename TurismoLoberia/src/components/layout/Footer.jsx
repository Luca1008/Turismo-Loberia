import React from 'react'
import '../../styles/footer.css'; // Asegúrate de tener este archivo

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/assets/logo-loberia.png" alt="Logo Lobería" />
        <p>GOBIERNO LOCAL</p>
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
        <div className="footer__item">
          <span>📢</span>
          <p>Suscribite a los newsletter</p>
        </div>
      </div>

      <div className="footer__social">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-whatsapp"></i></a>
      </div>
    </footer>
  );
};