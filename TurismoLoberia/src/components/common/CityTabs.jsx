import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaInfoCircle,
  FaLandmark,
  FaLeaf,
  FaSeedling,
  FaDove,
  FaRoute,
  FaBed,
  FaUtensils,
  FaBus,
  FaCalendarAlt,
  FaCompass,
  FaDownload,
} from "react-icons/fa";
import "../../styles/cityTabs.css";

/** Icono representativo de cada sección, reutilizado en todas las ciudades. */
const SECTION_ICONS = {
  informacion_general: FaInfoCircle,
  historia: FaLandmark,
  naturaleza: FaLeaf,
  producciones: FaSeedling,
  reserva_natural: FaDove,
  como_llegar: FaRoute,
  alojamientos: FaBed,
  gastronomia: FaUtensils,
  transporte: FaBus,
  agenda: FaCalendarAlt,
  que_hacer: FaCompass,
  descargas: FaDownload,
};

/**
 * Componente `CityTabs`
 *
 * Barra de navegación entre las secciones de una página de ciudad
 * (Partido de Lobería, Lobería, San Manuel, Arenas Verdes), presentada
 * como una pequeña "ruta" de paradas: cada sección es una parada sobre
 * una línea punteada, con la parada activa resaltada. Permite moverse
 * entre secciones sin volver al menú desplegable del header.
 *
 * @component
 * @param {string} basePath - Ruta base de la ciudad, ej. "/Loberia".
 * @param {string[]} sectionIds - Ids de sección en el orden a mostrar.
 * @param {string} activeSection - Id de la sección actualmente activa.
 */
const CityTabs = ({ basePath, sectionIds, activeSection }) => {
  const { t } = useTranslation();
  const activeLinkRef = useRef(null);

  // En mobile las solapas no entran todas en pantalla y se desplazan
  // horizontalmente: al entrar (o cambiar de sección) centramos la
  // solapa activa para que siempre quede visible, sin depender de que
  // el usuario descubra el scroll por su cuenta.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    activeLinkRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSection]);

  return (
    <nav className="city-tabs" aria-label={t("secciones_pagina")}>
      <ul className="city-tabs-track">
        {sectionIds.map((id) => {
          const Icon = SECTION_ICONS[id] || FaInfoCircle;
          const isActive = id === activeSection;
          return (
            <li key={id} className="city-tabs-stop">
              <Link
                ref={isActive ? activeLinkRef : null}
                to={`${basePath}/${id}`}
                className={`city-tabs-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="city-tabs-icon" aria-hidden="true" />
                <span>{t(id)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CityTabs;
