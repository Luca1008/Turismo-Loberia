import { CITY_SECTIONS } from "./citySections";

/**
 * Secciones que el superadmin puede editar desde "Editar secciones" del panel
 * de admin: subconjunto de `CITY_SECTIONS` que tiene un texto principal +
 * imagen de portada editables de forma genérica.
 *
 * Quedan afuera:
 * - "descargas" en todas las ciudades: son solo links de descarga, sin texto/imagen.
 * - "reserva_natural" (partido_loberia): sección con múltiples imágenes propias
 *   y contenido muy estructurado (experiencias, mapa, etc.), no un bloque
 *   único de texto + imagen.
 */
const EXCLUDED_SECTIONS_BY_CITY = {
  partido_loberia: ["descargas", "reserva_natural"],
  ciudad_loberia: ["descargas"],
  san_manuel: ["descargas"],
  arenas_verdes: ["descargas"],
};

export const EDITABLE_SECTIONS = Object.fromEntries(
  Object.entries(CITY_SECTIONS).map(([city, sections]) => [
    city,
    sections.filter((s) => !(EXCLUDED_SECTIONS_BY_CITY[city] || []).includes(s)),
  ])
);

/**
 * Dentro de `EDITABLE_SECTIONS`, secciones cuya imagen es editable pero cuyo
 * texto no: su contenido es un bloque HTML estructurado (h2/h3/ul) sin un
 * párrafo principal aislable, así que el componente público no tiene ningún
 * `text || t(...)` al que engancharse. Ver `san-manuel/Agenda.jsx` y
 * `san-manuel/QueHacer.jsx`.
 */
const TEXT_NOT_EDITABLE = {
  san_manuel: ["agenda", "que_hacer"],
};

export const isTextEditable = (city, section) =>
  !(TEXT_NOT_EDITABLE[city] || []).includes(section);
