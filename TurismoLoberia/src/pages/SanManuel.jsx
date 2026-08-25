import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/city.css";
import { trackEvent } from "../analytics";
import { CITY_SECTIONS } from "../helpers/citySections";
import CityTabs from "../components/common/CityTabs";
import InformacionGeneral from "./city-sections/san-manuel/InformacionGeneral";
import ComoLlegar from "./city-sections/san-manuel/ComoLlegar";
import Alojamientos from "./city-sections/san-manuel/Alojamientos";
import Gastronomia from "./city-sections/san-manuel/Gastronomia";
import Transporte from "./city-sections/san-manuel/Transporte";
import Agenda from "./city-sections/san-manuel/Agenda";
import QueHacer from "./city-sections/san-manuel/QueHacer";
import Descargas from "./city-sections/san-manuel/Descargas";

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
 * Componente `SanManuel`
 *
 * Página de la localidad de San Manuel. Renderiza únicamente el componente
 * de la sección indicada por el parámetro de ruta `:section` (ver
 * CITY_SECTIONS), en lugar de todas las secciones a la vez.
 *
 * @component
 * @returns {JSX.Element}
 */
export const SanManuel = () => {
  const { i18n } = useTranslation();
  const { section } = useParams();
  const sectionIds = CITY_SECTIONS.san_manuel;
  const SectionComponent = SECTION_COMPONENTS[section];

  useEffect(() => {
    if (!SectionComponent) return;
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "San Manuel",
    });
    trackEvent({
      category: "Sección",
      action: "Vista sección",
      label: section,
    });
  }, [section, SectionComponent]);

  if (!SectionComponent) {
    return <Navigate to={`/SanManuel/${sectionIds[0]}`} replace />;
  }

  return (
    <div className="city" key={i18n.language}>
      <CityTabs
        basePath="/SanManuel"
        sectionIds={sectionIds}
        activeSection={section}
      />
      <SectionComponent />
    </div>
  );
};

export default SanManuel;
