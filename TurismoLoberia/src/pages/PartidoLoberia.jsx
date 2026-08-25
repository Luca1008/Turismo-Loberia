import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/city.css";
import { trackEvent } from "../analytics";
import { CITY_SECTIONS } from "../helpers/citySections";
import CityTabs from "../components/common/CityTabs";
import InformacionGeneral from "./city-sections/partido-loberia/InformacionGeneral";
import Historia from "./city-sections/partido-loberia/Historia";
import Naturaleza from "./city-sections/partido-loberia/Naturaleza";
import Producciones from "./city-sections/partido-loberia/Producciones";
import ReservaNatural from "./city-sections/partido-loberia/ReservaNatural";
import ComoLlegar from "./city-sections/partido-loberia/ComoLlegar";
import Descargas from "./city-sections/partido-loberia/Descargas";

const SECTION_COMPONENTS = {
  informacion_general: InformacionGeneral,
  historia: Historia,
  naturaleza: Naturaleza,
  producciones: Producciones,
  reserva_natural: ReservaNatural,
  como_llegar: ComoLlegar,
  descargas: Descargas,
};

/**
 * Componente `PartidoLoberia`
 *
 * Página del Partido de Lobería. Renderiza únicamente el componente de la
 * sección indicada por el parámetro de ruta `:section` (ver CITY_SECTIONS),
 * en lugar de todas las secciones a la vez.
 *
 * @component
 * @returns {JSX.Element}
 */
const PartidoLoberia = () => {
  const { i18n } = useTranslation();
  const { section } = useParams();
  const sectionIds = CITY_SECTIONS.partido_loberia;
  const SectionComponent = SECTION_COMPONENTS[section];

  useEffect(() => {
    if (!SectionComponent) return;
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Partido Lobería",
    });
    trackEvent({
      category: "Sección",
      action: "Vista sección",
      label: section,
    });
  }, [section, SectionComponent]);

  if (!SectionComponent) {
    return <Navigate to={`/PartidoLoberia/${sectionIds[0]}`} replace />;
  }

  return (
    <div className="city" key={i18n.language}>
      <CityTabs
        basePath="/PartidoLoberia"
        sectionIds={sectionIds}
        activeSection={section}
      />
      <SectionComponent />
    </div>
  );
};

export default PartidoLoberia;
