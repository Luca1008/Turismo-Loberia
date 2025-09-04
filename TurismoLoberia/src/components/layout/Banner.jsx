import React, { useEffect, useRef, useState } from 'react';
import "../../styles/banner.css";
import invitesImg from "../../assets/images/invites-transparent.png";
import { useTranslation } from "react-i18next";
import { PiCursorClick, PiCaretDown, PiCaretUp } from "react-icons/pi";

export const Banner = () => {
  const { t, i18n } = useTranslation();
  const handRef = useRef(null);
  const linkRef = useRef(null);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // En móviles, colapsar el texto inicialmente
      if (mobile) {
        setIsTextExpanded(false);
      } else {
        setIsTextExpanded(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handElement = handRef.current;
    const linkElement = linkRef.current;
    
    if (!handElement || !linkElement || isMobile) return;

    // Función para posicionar y animar la mano
    const positionAndAnimateHand = () => {
      const linkRect = linkElement.getBoundingClientRect();
      const bannerRect = linkElement.closest('.banner-loberia').getBoundingClientRect();
      
      // Posicionar la mano a la izquierda del enlace
      handElement.style.left = `${linkRect.left - bannerRect.left - 45}px`;
      handElement.style.top = `${linkRect.top - bannerRect.top + 5}px`;
      handElement.style.display = 'block';
      
      // Animación de movimiento
      handElement.animate(
        [
          { transform: 'translateY(0) translateX(0) scale(1)' },
          { transform: 'translateY(-5px) translateX(5px) scale(1.1)' },
          { transform: 'translateY(0) translateX(0) scale(1)' }
        ],
        {
          duration: 1000,
          iterations: Infinity
        }
      );
    };

    // Iniciar animación después de un breve retraso
    const animationTimer = setTimeout(positionAndAnimateHand, 1000);

    // Reposicionar en caso de redimensionamiento
    window.addEventListener('resize', positionAndAnimateHand);

    // Ocultar mano al hacer hover sobre el enlace
    const handleLinkHover = () => {
      handElement.style.display = 'none';
    };

    const handleLinkLeave = () => {
      handElement.style.display = 'block';
    };

    linkElement.addEventListener('mouseenter', handleLinkHover);
    linkElement.addEventListener('mouseleave', handleLinkLeave);

    return () => {
      clearTimeout(animationTimer);
      window.removeEventListener('resize', positionAndAnimateHand);
      linkElement.removeEventListener('mouseenter', handleLinkHover);
      linkElement.removeEventListener('mouseleave', handleLinkLeave);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const toggleText = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  return (
    <section className="banner-loberia" key={i18n.language}>
      {/* Elemento de la mano animada */}
      <div ref={handRef} className="animated-hand"><PiCursorClick /></div>
      
      <div className="banner-content">
        <img src={invitesImg} alt="Lobería Te Invita" className="banner-image" />
        <div className="banner-text-container">
          <div 
            ref={textRef} 
            className={`banner-text ${isTextExpanded ? 'expanded' : 'collapsed'}`}
          >
            <p>{t("p1_invites")}</p>
            <p>{t("p2_invites")}</p>
            <p>{t("p3_invites")}</p>
            <p>
              {t("link_invites")}
              <a 
                ref={linkRef}
                className='banner-link'
                href="https://forms.gle/kmbozSt448xEVYC57"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("link_aqui")}
              </a>
            </p>
          </div>
          
          {/* Flecha desplegable para móviles */}
          {isMobile && (
            <button className="expand-button" onClick={toggleText}>
              {isTextExpanded ? (
                <><PiCaretUp /> Ver menos</>
              ) : (
                <><PiCaretDown /> Ver más</>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};