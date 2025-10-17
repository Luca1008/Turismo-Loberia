import React, { useEffect, useRef, useState } from "react";
import "../../styles/banner.css";
import invitesImg from "../../assets/images/alojamiento.png";
import { useTranslation } from "react-i18next";
import { PiCursorClick, PiCaretDown, PiCaretUp } from "react-icons/pi";

/**
 * Componente `Banner`
 *
 * Muestra un banner promocional de Lobería con texto, imagen y un enlace interactivo.
 * Incluye animación de una mano señalando el enlace y funcionalidad de expandir/colapsar
 * el texto en dispositivos móviles.
 *
 * @component
 *
 * @example
 * <Banner />
 *
 * @returns {JSX.Element} Banner con imagen, texto, enlace y animación interactiva
 */
export const Banner = () => {
  const { t, i18n } = useTranslation();
  const handRef = useRef(null);
  const linkRef = useRef(null);
  const textRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  /**
   * Verifica si el dispositivo es móvil y ajusta el estado de expansión del texto.
   * Posiciona y anima la mano interactiva señalando el enlace.
   */
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsTextExpanded(false);
      } else {
        setIsTextExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handElement = handRef.current;
    const linkElement = linkRef.current;

    if (!handElement || !linkElement || isMobile) return;

    const positionAndAnimateHand = () => {
      const linkRect = linkElement.getBoundingClientRect();
      const bannerRect = linkElement
        .closest(".banner-loberia")
        .getBoundingClientRect();

      handElement.style.left = `${linkRect.left - bannerRect.left - 45}px`;
      handElement.style.top = `${linkRect.top - bannerRect.top + 5}px`;
      handElement.style.display = "block";

      handElement.animate(
        [
          { transform: "translateY(0) translateX(0) scale(1)" },
          { transform: "translateY(-5px) translateX(5px) scale(1.1)" },
          { transform: "translateY(0) translateX(0) scale(1)" },
        ],
        {
          duration: 1000,
          iterations: Infinity,
        }
      );
    };

    const animationTimer = setTimeout(positionAndAnimateHand, 1000);

    window.addEventListener("resize", positionAndAnimateHand);

    const handleLinkHover = () => {
      handElement.style.display = "none";
    };

    const handleLinkLeave = () => {
      handElement.style.display = "block";
    };

    linkElement.addEventListener("mouseenter", handleLinkHover);
    linkElement.addEventListener("mouseleave", handleLinkLeave);

    return () => {
      clearTimeout(animationTimer);
      window.removeEventListener("resize", positionAndAnimateHand);
      linkElement.removeEventListener("mouseenter", handleLinkHover);
      linkElement.removeEventListener("mouseleave", handleLinkLeave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  /**
   * Alterna la expansión o colapso del texto en móviles.
   */
  const toggleText = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  return (
    <section className="banner-loberia" key={i18n.language}>
      <div ref={handRef} className="animated-hand">
        <PiCursorClick />
      </div>
      <div className="banner-content">
        <img
          src={invitesImg}
          alt="Lobería Te Invita"
          className="banner-image"
        />
        <div className="banner-text-container">
          <div
            ref={textRef}
            className={`banner-text ${
              isTextExpanded ? "expanded" : "collapsed"
            }`}
          >
            <p>{t("p1_alojamiento")}</p>
            <p>{t("p2_alojamiento")}</p>
            <p>{t("p3_alojamiento")}</p>
            <p>
              {t("link_invites")}
              <a
                ref={linkRef}
                className="banner-link"
                href="https://forms.gle/kmbozSt448xEVYC57"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("link_aqui")}
              </a>
            </p>
          </div>

          {isMobile && (
            <button className="expand-button" onClick={toggleText}>
              {isTextExpanded ? (
                <>
                  <PiCaretUp /> Ver menos
                </>
              ) : (
                <>
                  <PiCaretDown /> Ver más
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
