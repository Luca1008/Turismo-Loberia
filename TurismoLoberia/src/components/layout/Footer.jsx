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

  // Nueva función para trackear divs que se puedan clicar
  const handleTrackDivClick = (label) => () => {
    trackEvent({
      category: "Footer",
      action: "Clic div",
      label: label,
    });
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
          <div className="footer__logo" onClick={handleTrackDivClick("Logo footer div")}>
            <img src={logoLoberiaFooter} alt="Lobería Gobierno Local" />
          </div>
        </Link>

        {/* Contacto y Dirección */}
        <div className="footer__info">
          <div
            className="footer__item"
            onClick={handleTrackDivClick("Contacto div")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') handleTrackDivClick("Contacto div")(); }}
          >
            <FaEnvelope />
            <a href="/Contacto">
              <p>{t("footer_contact")}</p>
            </a>
          </div>

          <div
            className="footer__item"
            onClick={handleTrackDivClick("Dirección div")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') handleTrackDivClick("Dirección div")(); }}
          >
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lobería"
              onClick={handleTrackLink(
                "Dirección mapa",
                "https://www.google.com/maps/dir//Av.+Campos+500,+B7635+Lobería"
              )}
            >
              <p>{t("footer_direccion")}</p>
            </a>
          </div>
        </div>

        {/* Newsletter + Redes sociales */}
        <div className="footer__extra">
          <div
            className="footer__item"
            onClick={handleTrackDivClick("Newsletter div")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') handleTrackDivClick("Newsletter div")(); }}
          >
            <FaBell />
            <a
              href="/Suscribirse"
            >
              <p>{t("footer_newsletter")}</p>
            </a>
          </div>

          <div
            className="footer__social"
            onClick={handleTrackDivClick("Redes sociales div")}
            role="group"
            tabIndex={-1}
          >
            <a
              href="https://www.facebook.com/loberiaturismo"
              onClick={handleTrackLink(
                "Facebook",
                "https://www.facebook.com/loberiaturismo"
              )}
            >
              <FaFacebook className="svg-social" />
            </a>
            <a
              href="https://www.instagram.com/turismoloberia"
              onClick={handleTrackLink(
                "Instagram",
                "https://www.instagram.com/turismoloberia"
              )}
            >
              <FaInstagram className="svg-social" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA"
              onClick={handleTrackLink(
                "YouTube",
                "https://www.youtube.com/channel/UCsAuGNjsbHgbGKn-1rG8mGA"
              )}
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

export default Footer;