import React from "react";
import { Link } from "react-router-dom";
import logoLoberiaFooter from "../../assets/icons/logoLoberia.jpg";
import "../../styles/footer.css";
import handleExternalLink from "../common/HandleExternalLink";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../../analytics";

import {
  FaBell,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

/**
 * Componente `Footer`
 *
 * Footer del sitio web con:
 * - Logo de Lobería.
 * - Información de contacto y dirección.
 * - Suscripción a newsletter.
 * - Enlaces a redes sociales (Facebook, Instagram, YouTube, WhatsApp).
 *
 * Incluye tracking de eventos para Google Analytics en todos los enlaces y divs clickeables.
 *
 * @component
 * 
 * @example
 * <Footer />
 *
 * @returns {JSX.Element} Footer con logo, enlaces de contacto y redes sociales.
 */
export const Footer = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  /**
   * Maneja el tracking de clic en un enlace externo y luego abre el enlace.
   * @param {string} label - Etiqueta descriptiva para analytics.
   * @param {string} url - URL del enlace.
   * @returns {Function} Función que maneja el evento click.
   */
  const handleTrackLink = (label, url) => (e) => {
    trackEvent({
      category: "Footer",
      action: "Clic enlace",
      label: label,
    });
    handleExternalLink(e, url);
  };

  /**
   * Maneja el tracking de clic en un div o grupo de elementos.
   * @param {string} label - Etiqueta descriptiva para analytics.
   * @returns {Function} Función que maneja el evento click.
   */
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
        {/* Logo */}
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
          <div
            className="footer__logo"
            onClick={handleTrackDivClick("Logo footer div")}
          >
            <img src={logoLoberiaFooter} alt="Lobería Patrimnio Vivo" />
            <div className="footer__logo__text">
              <strong className="primary loberia-footer">Lobería</strong>
              <span className="patrimonio">
                Patrimonio
                <strong
                  className="vivo"
                  style={{
                    fontFamily: "MADE Tommy Bold, sans-serif",
                    letterSpacing: "0.5px",
                    fontSize: "24px",
                    marginRight: "5px",
                    marginBottom: "3px",
                  }}
                >
                  Vivo
                </strong>
              </span>
            </div>
          </div>
        </Link>

        {/* Información de contacto y dirección */}
        <div className="footer__info">
          <div
            className="footer__item"
            onClick={handleTrackDivClick("Contacto div")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleTrackDivClick("Contacto div")();
            }}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") handleTrackDivClick("Dirección div")();
            }}
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

        {/* Newsletter y redes sociales */}
        <div className="footer__extra">
          <div
            className="footer__item"
            onClick={handleTrackDivClick("Newsletter div")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleTrackDivClick("Newsletter div")();
            }}
          >
            <FaBell />
            <a href="/Suscribirse">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
