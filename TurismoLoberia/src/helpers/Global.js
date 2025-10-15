/**
 * Objeto `Global`
 *
 * Contiene URLs base utilizadas en la aplicación para realizar peticiones HTTP.
 *
 * @type {Object}
 * @property {string} url - URL base para las rutas de la API (ej: endpoints REST).
 * @property {string} baseUrl - URL base del servidor (puede ser utilizada para recursos estáticos o redirecciones).
 *
 * @example
 * import { Global } from '../helpers/Global';
 *
 * // Ejemplo de uso con fetch
 * fetch(`${Global.url}usuarios`)
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 */
/*
// Producción
export const Global = {
  url: "https://turismoloberia.tur.ar/api/",
  baseUrl: "https://turismoloberia.tur.ar/",
};
*/
// Desarrollo local
export const Global = {
  url: "http://localhost:5000/api/",
  baseUrl: "http://localhost:5000/"
};
