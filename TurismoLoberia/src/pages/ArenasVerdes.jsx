import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/city.css";
import { trackEvent } from "../analytics";
import { CITY_SECTIONS } from "../helpers/citySections";
import CityTabs from "../components/common/CityTabs";
import InformacionGeneral from "./city-sections/arenas-verdes/InformacionGeneral";
import ComoLlegar from "./city-sections/arenas-verdes/ComoLlegar";
import Alojamientos from "./city-sections/arenas-verdes/Alojamientos";
import Gastronomia from "./city-sections/arenas-verdes/Gastronomia";
import Transporte from "./city-sections/arenas-verdes/Transporte";
import Agenda from "./city-sections/arenas-verdes/Agenda";
import QueHacer from "./city-sections/arenas-verdes/QueHacer";
import Descargas from "./city-sections/arenas-verdes/Descargas";

const SECTION_COMPONENTS = {
  informacion_general: InformacionGeneral,
  como_llegar: ComoLlegar,
  alojamientos: Alojamientos,
  gastronomia: Gastronomia,
  transporte: Transporte,
  agenda: Agenda,
  que_hacer: QueHacer,
  descargas: Descargas,
};

/**
 * Componente `ArenasVerdes`
 *
 * Página de Arenas Verdes. Renderiza únicamente el componente de la sección
 * indicada por el parámetro de ruta `:section` (ver CITY_SECTIONS), en lugar
 * de todas las secciones a la vez.
 *
 * @component
 * @returns {JSX.Element}
 */
const ArenasVerdes = () => {
  const { i18n } = useTranslation();
  const { section } = useParams();
  const sectionIds = CITY_SECTIONS.arenas_verdes;
  const SectionComponent = SECTION_COMPONENTS[section];

  useEffect(() => {
    if (!SectionComponent) return;
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Arenas Verdes",
    });
    trackEvent({
      category: "Sección",
      action: "Vista sección",
      label: section,
    });
  }, [section, SectionComponent]);

  if (!SectionComponent) {
    return <Navigate to={`/ArenasVerdes/${sectionIds[0]}`} replace />;
  }

  return (
    <div className="city" key={i18n.language}>
      <CityTabs
        basePath="/ArenasVerdes"
        sectionIds={sectionIds}
        activeSection={section}
      />
      <SectionComponent />
    </div>
  );
};

export default ArenasVerdes;
