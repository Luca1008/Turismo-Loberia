import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
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

/** Color de acento del chip de cada solapa (rota verde/naranja/azul/amarillo,
 * igual en las 4 ciudades para que la misma sección siempre tenga el mismo
 * color). */
const SECTION_ACCENTS = {
  informacion_general: "green",
  historia: "orange",
  naturaleza: "blue",
  producciones: "yellow",
  reserva_natural: "green",
  como_llegar: "orange",
  alojamientos: "blue",
  gastronomia: "yellow",
  transporte: "green",
  agenda: "orange",
  que_hacer: "blue",
  descargas: "yellow",
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
  const trackRef = useRef(null);

  /** Muestra/oculta cada flecha según si todavía queda contenido para ese lado. */
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4
    );
  }, []);

  const scrollByAmount = (direction) => {
    trackRef.current?.scrollBy({
      left: direction * (trackRef.current.clientWidth * 0.6),
      behavior: "smooth",
    });
  };

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
    // El scroll del scrollIntoView es async: recalculamos las flechas un
    // instante después para que reflejen la posición final.
    const timer = setTimeout(updateArrows, 350);
    return () => clearTimeout(timer);
  }, [activeSection, updateArrows]);

  // Detecta si hace falta mostrar flechas al montar y si cambia el tamaño
  // de pantalla (en desktop ancho puede que ya entren todas las solapas).
  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, sectionIds]);

  return (
    <nav className="city-tabs" aria-label={t("secciones_pagina")}>
      {canScrollLeft && (
        <button
          type="button"
          className="city-tabs-arrow city-tabs-arrow-left"
          aria-label={t("anterior")}
          onClick={() => scrollByAmount(-1)}
        >
          <LuChevronLeft aria-hidden="true" />
        </button>
      )}
      <ul
        className="city-tabs-track"
        ref={trackRef}
        onScroll={updateArrows}
      >
        {sectionIds.map((id) => {
          const Icon = SECTION_ICONS[id] || FaInfoCircle;
          const accent = SECTION_ACCENTS[id] || "green";
          const isActive = id === activeSection;
          return (
            <li key={id} className="city-tabs-stop">
              <Link
                ref={isActive ? activeLinkRef : null}
                to={`${basePath}/${id}`}
                className={`city-tabs-link tab-${accent}${
                  isActive ? " is-active" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="city-tabs-icon-chip">
                  <Icon className="city-tabs-icon" aria-hidden="true" />
                </span>
                <span>{t(id)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {canScrollRight && (
        <button
          type="button"
          className="city-tabs-arrow city-tabs-arrow-right"
          aria-label={t("siguiente")}
          onClick={() => scrollByAmount(1)}
        >
          <LuChevronRight aria-hidden="true" />
        </button>
      )}
    </nav>
  );
};

export default CityTabs;
