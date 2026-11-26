/**
 * Whitelist de ciudades y secciones válidas.
 *
 * Copia de `TurismoLoberia/src/helpers/citySections.js`. Se usa para validar los
 * parámetros `:city`/`:section` antes de tocar filesystem o el JSON de overrides
 * (evita path traversal). Como `Backend/` y `TurismoLoberia/` son proyectos
 * separados (sin monorepo compartido), este archivo debe mantenerse sincronizado
 * a mano con el del frontend si se agregan/quitan ciudades o secciones.
 */
const CITY_SECTIONS = {
  partido_loberia: [
    "informacion_general",
    "historia",
    "naturaleza",
    "producciones",
    "reserva_natural",
    "como_llegar",
    "descargas",
  ],
  ciudad_loberia: [
    "informacion_general",
    "como_llegar",
    "alojamientos",
    "gastronomia",
    "transporte",
    "agenda",
    "que_hacer",
    "descargas",
  ],
  san_manuel: [
    "informacion_general",
    "como_llegar",
    "alojamientos",
    "gastronomia",
    "transporte",
    "agenda",
    "que_hacer",
    "descargas",
  ],
  arenas_verdes: [
    "informacion_general",
    "como_llegar",
    "alojamientos",
    "gastronomia",
    "transporte",
    "agenda",
    "que_hacer",
    "descargas",
  ],
};

const isValidCitySection = (city, section) => {
  const sections = CITY_SECTIONS[city];
  return Boolean(sections) && sections.includes(section);
};

module.exports = { CITY_SECTIONS, isValidCitySection };
