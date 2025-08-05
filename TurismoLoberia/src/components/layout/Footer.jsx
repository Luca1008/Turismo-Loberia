import React from "react";
import { Link } from "react-router-dom";
import logoLoberiaFooter from "../../assets/icons/logoLoberiaFooter.svg";
import "../../styles/footer.css";
import handleExternalLink from "../common/handleExternalLink";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../../analytics"; // ✅ GA4

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

  const handleTrackLink = (label, url) => (e) => {
    trackEvent({
      category: "Footer",
      action: "Clic enlace",
      label: label,
    });
    handleExternalLink(e, url);
  };

  return (
    <footer className="footer" key={i18n.language}>
      <div className="footer__container">
        {/* Logo institucional */}
        <Link
          to="/"
          className="text-decoration-none"
          onClick={() =>
            trackEvent({
              category: "Footer",
              action: "Clic logo",
              label: "Logo footer",
            })
          }
        >
          <div className="footer__logo">
            <img src={logoLoberiaFooter} alt="Lobería Gobierno Local" />
          </div>
        </Link>

        {/* Contacto y Dirección */}
        <div className="footer__info">
          <Link
            to="/Contacto"
            className="text-decoration-none"
            onClick={() =>
              trackEvent({
                category: "Footer",
                action: "Clic enlace",
                label: "Contacto",
              })
            }
          >
            <div className="footer__item">
              <FaEnvelope />
              <p>{t("footer_contact")}</p>
            </div>
          </Link>

          <div className="footer__item">
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lobería"
              onClick={handleTrackLink("Dirección mapa", "https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lobería")}
            >
              <p>{t("footer_direccion")}</p>
            </a>
          </div>
        </div>

        {/* Newsletter + Redes sociales */}
        <div className="footer__extra">
          <Link
            to="/Suscribirse"
            className="text-decoration-none"
            onClick={() =>
              trackEvent({
                category: "Footer",
                action: "Clic enlace",
                label: "Suscribirme",
              })
            }
          >
            <div className="footer__item">
              <FaBell />
              <p>{t("footer_newsletter")}</p>
            </div>
          </Link>

          <div className="footer__social">
            <a
              href="https://www.facebook.com/loberiaturismo"
              onClick={handleTrackLink("Facebook", "https://www.facebook.com/loberiaturismo")}
            >
              <FaFacebook className="svg-social" />
            </a>
            <a
              href="https://www.instagram.com/turismoloberia"
              onClick={handleTrackLink("Instagram", "https://www.instagram.com/turismoloberia")}
            >
              <FaInstagram className="svg-social" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA"
              onClick={handleTrackLink("YouTube", "https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA")}
            >
              <FaYoutube className="svg-social" />
            </a>
            <a href="#" onClick={handleTrackLink("WhatsApp", "#")}>
              <FaWhatsapp className="svg-social" />
            </a>
            <a href="#" onClick={handleTrackLink("TikTok", "#")}>
              <FaTiktok className="svg-social" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
