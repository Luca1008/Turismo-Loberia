import { useEffect } from "react";

const SITE_URL = "https://turismoloberia.tur.ar";

/** Busca (o crea) un <meta>/<link> en el <head> y devuelve el elemento. */
const ensureHeadTag = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

/**
 * Hook `usePageMeta`
 *
 * Fija el título, la meta descripción, la URL canónica y las etiquetas
 * Open Graph de la página actual, para que Google (que ejecuta el JS del
 * sitio al indexar) y las redes sociales muestren un título y resumen
 * propios de cada sección en vez del genérico "Turismo Lobería". Al
 * desmontar restaura los valores anteriores.
 *
 * @param {Object} meta
 * @param {string} meta.title - Título de la pestaña / resultado de Google.
 * @param {string} meta.description - Resumen (idealmente < 160 caracteres).
 * @param {string} meta.path - Ruta canónica, ej. "/Loberia/alojamientos".
 */
const usePageMeta = ({ title, description, path }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const tags = [
      [`meta[name="description"]`, "name", "description", description],
      [`meta[property="og:title"]`, "property", "og:title", title],
      [`meta[property="og:description"]`, "property", "og:description", description],
      [`meta[property="og:url"]`, "property", "og:url", url],
    ];

    const prevTitle = document.title;
    document.title = title;

    const restores = tags.map(([selector, attr, key, value]) => {
      const el = ensureHeadTag(selector, () => {
        const m = document.createElement("meta");
        m.setAttribute(attr, key);
        return m;
      });
      const prev = el.getAttribute("content");
      el.setAttribute("content", value);
      return () => (prev === null ? el.remove() : el.setAttribute("content", prev));
    });

    const canonical = ensureHeadTag(`link[rel="canonical"]`, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    const prevCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", url);

    return () => {
      document.title = prevTitle;
      restores.forEach((restore) => restore());
      if (prevCanonical === null) canonical.remove();
      else canonical.setAttribute("href", prevCanonical);
    };
  }, [title, description, path]);
};

export default usePageMeta;
