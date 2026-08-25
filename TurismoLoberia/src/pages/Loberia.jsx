import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/city.css";
import { trackEvent } from "../analytics";
import { CITY_SECTIONS } from "../helpers/citySections";
import CityTabs from "../components/common/CityTabs";
import InformacionGeneral from "./city-sections/loberia/InformacionGeneral";
import ComoLlegar from "./city-sections/loberia/ComoLlegar";
import Alojamientos from "./city-sections/loberia/Alojamientos";
import Gastronomia from "./city-sections/loberia/Gastronomia";
import Transporte from "./city-sections/loberia/Transporte";
import Agenda from "./city-sections/loberia/Agenda";
import QueHacer from "./city-sections/loberia/QueHacer";
import Descargas from "./city-sections/loberia/Descargas";

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
 * Componente `Loberia`
 *
 * Página de la ciudad de Lobería. Renderiza únicamente el componente de la
 * sección indicada por el parámetro de ruta `:section` (ver CITY_SECTIONS),
 * en lugar de todas las secciones a la vez.
 *
 * @component
 * @returns {JSX.Element}
 */
const Loberia = () => {
  const { i18n } = useTranslation();
  const { section } = useParams();
  const sectionIds = CITY_SECTIONS.ciudad_loberia;
  const SectionComponent = SECTION_COMPONENTS[section];

  useEffect(() => {
    if (!SectionComponent) return;
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Lobería",
    });
    trackEvent({
      category: "Sección",
      action: "Vista sección",
      label: section,
    });
  }, [section, SectionComponent]);

  if (!SectionComponent) {
    return <Navigate to={`/Loberia/${sectionIds[0]}`} replace />;
  }

  return (
    <div className="city" key={i18n.language}>
      <CityTabs
        basePath="/Loberia"
        sectionIds={sectionIds}
        activeSection={section}
      />
      <SectionComponent />
    </div>
  );
};

export default Loberia;
