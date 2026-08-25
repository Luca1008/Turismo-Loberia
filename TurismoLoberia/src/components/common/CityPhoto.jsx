import React from "react";
import "../../styles/cityPhoto.css";

/**
 * Componente `CityPhoto`
 *
 * Foto a ancho completo para las páginas de ciudad, con crédito opcional
 * del autor/organización al pie (ej. "Nombre - Club de Observadores de
 * Aves Lobería").
 *
 * @component
 * @param {string} src
 * @param {string} alt
 * @param {string} [credit]
 * @param {boolean} [contain] - Muestra la imagen completa (sin recortar) en
 * lugar de rellenar el recuadro, útil para afiches o gráficos informativos.
 * @param {string} [className] - Clase adicional para el `<figure>`.
 */
const CityPhoto = ({ src, alt, credit, contain, className }) => (
  <figure
    className={`city-photo${contain ? " city-photo--contain" : ""}${
      className ? ` ${className}` : ""
    }`}
  >
    <img src={src} alt={alt} loading="lazy" />
    {credit && <figcaption className="city-photo-credit">{credit}</figcaption>}
  </figure>
);

export default CityPhoto;
