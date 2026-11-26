import {
  LuBedDouble,
  LuUtensils,
  LuLandmark,
  LuCalendarDays,
  LuMapPin,
  LuPalette,
  LuBuilding2,
  LuInfo,
  LuImage,
} from "react-icons/lu";
import "../../styles/cardPlaceholder.css";

/** Acento de color por categoría: el mismo de la solapa de ciudad que le
 * corresponde (SECTION_ACCENTS en CityTabs.jsx), para que una card se vea
 * igual en el buscador que en su sección. Lo usan ContentCard (chip y
 * botón) y este placeholder. */
export const CATEGORY_ACCENTS = {
  Alojamiento: "blue", // solapa Alojamientos
  Gastronomia: "yellow", // solapa Gastronomía
  Evento: "orange", // solapa Agenda
  Interes: "blue", // solapa Qué Hacer
  Cultura: "orange", // solapa Historia
  Artesanos: "yellow", // solapa Producciones
  ServPublicos: "green", // solapa Transporte
  InfoUtil: "green", // solapa Información General
};

/** Ícono representativo de cada categoría. */
const CATEGORY_ICONS = {
  Alojamiento: LuBedDouble,
  Gastronomia: LuUtensils,
  Cultura: LuLandmark,
  Evento: LuCalendarDays,
  Interes: LuMapPin,
  Artesanos: LuPalette,
  ServPublicos: LuBuilding2,
  InfoUtil: LuInfo,
};

/**
 * Reemplazo de la foto de una card cuando no tiene imagen (o no carga):
 * fondo suave del color de la categoría, el ícono de la categoría en un
 * círculo blanco y una marca de agua grande del mismo ícono.
 * Es decorativo (aria-hidden): el título de la card ya describe el contenido.
 *
 * @param {Object} props
 * @param {string} [props.category] - Categoría de la card (ej. "Alojamiento").
 * @param {string} [props.className] - Clases extra (tamaño según dónde se use).
 */
const CardPlaceholder = ({ category = "", className = "" }) => {
  const Icon = CATEGORY_ICONS[category] || LuImage;
  const accent = CATEGORY_ACCENTS[category] || "green";

  return (
    <div className={`card-placeholder placeholder-${accent} ${className}`} aria-hidden="true">
      <Icon className="card-placeholder-watermark" />
      <span className="card-placeholder-icon">
        <Icon />
      </span>
    </div>
  );
};

export default CardPlaceholder;
