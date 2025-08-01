import React from "react";
import { Link } from "react-router-dom";
import logoLoberiaFooter from "../../assets/icons/logoLoberiaFooter.svg";
import "../../styles/footer.css";
import handleExternalLink from "../common/handleExternalLink";
import { useTranslation } from "react-i18next";

// Íconos - Todos de Font Awesome para consistencia
import {
  FaBell,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export const Footer = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <footer className="footer" key={i18n.language}>
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
              <p>{t("footer_contact")}</p>
            </div>
          </Link>
          <div className="footer__item">
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lober%C3%ADa,+Provincia+de+Buenos+Aires/@-38.1582446,-58.8596914,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x958fdf4f2ba92247:0x78b50e769e3fe747!2m2!1d-58.7772657!2d-38.1582912?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
              onClick={(e) =>
                handleExternalLink(
                  e,
                  "https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lober%C3%ADa,+Provincia+de+Buenos+Aires/@-38.1582446,-58.8596914,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x958fdf4f2ba92247:0x78b50e769e3fe747!2m2!1d-58.7772657!2d-38.1582912?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                )
              }
            >
              <p>{t("footer_direccion")}</p>
            </a>
          </div>
        </div>

        {/* Newsletter + redes sociales */}
        <div className="footer__extra">
          <Link to="/Suscribirse" className="text-decoration-none">
            <div className="footer__item">
              <FaBell />
              <p>{t("footer_newsletter")}</p>
            </div>
          </Link>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/loberiaturismo"
              onClick={(e) =>
                handleExternalLink(e, "https://www.facebook.com/loberiaturismo")
              }
            >
              <FaFacebook className="svg-social" />
            </a>
            <a
              href="https://www.instagram.com/turismoloberia"
              onClick={(e) =>
                handleExternalLink(
                  e,
                  "https://www.instagram.com/turismoloberia"
                )
              }
            >
              <FaInstagram className="svg-social" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA"
              onClick={(e) =>
                handleExternalLink(
                  e,
                  "https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA"
                )
              }
            >
              <FaYoutube className="svg-social" />
            </a>
            <a href="#" onClick={(e) => handleExternalLink(e, "#")}>
              <FaWhatsapp className="svg-social" />
            </a>
            <a href="#" onClick={(e) => handleExternalLink(e, "#")}>
              <FaTiktok className="svg-social" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
