/**
 * Ids de sección por ciudad, en el orden en que se muestran como tabs.
 * Cada id debe coincidir con:
 * - la key de traducción usada para el label del tab (t(id))
 * - el id de la <section> correspondiente en la página de la ciudad
 * - el hash usado en los links del dropdown del navbar (Header.jsx)
 *
 * Fuente única para que el navbar y las páginas de ciudad no se desincronicen.
 */
export const CITY_SECTIONS = {
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
  // Nota: el navbar tenía "base_campamentos" como subitem, pero la página
  // de Arenas Verdes nunca tuvo una <section> para esa id (el link no hacía
  // nada). Se quita del listado hasta que exista contenido real para esa
  // sección; si se agrega, sumarla acá vuelve a mostrarla como tab.
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
