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

// `npm run dev` usa el backend local; `npm run build` (lo que corre
// `make deploy`) usa el de producción. Así no hay que acordarse de cambiarlo
// a mano antes de publicar.
export const Global = import.meta.env.PROD
  ? {
      // Producción
      url: "https://turismoloberia.tur.ar/api/",
      baseUrl: "https://turismoloberia.tur.ar/",
    }
  : {
      // Desarrollo local
      url: "http://localhost:5000/api/",
      baseUrl: "http://localhost:5000/",
    };

/**
 * Convierte una URL relativa devuelta por el backend (ej. "/api/public/...")
 * en una URL absoluta usando `Global.baseUrl`. Necesario porque en desarrollo
 * local el frontend y el backend corren en puertos distintos, mientras que en
 * producción comparten dominio a través del proxy de Apache.
 *
 * @param {string|null} relativeUrl
 * @returns {string|null}
 */
export const resolveApiUrl = (relativeUrl) =>
  relativeUrl ? `${Global.baseUrl}${relativeUrl.replace(/^\//, "")}` : null;