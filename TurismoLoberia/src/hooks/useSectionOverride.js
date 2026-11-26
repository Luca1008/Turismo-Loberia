import { useEffect, useState } from "react";
import { Global, resolveApiUrl } from "../helpers/Global";

/**
 * Custom hook `useSectionOverride`
 *
 * Consulta el override (texto/imagen) que el superadmin haya cargado para una
 * sección de ciudad desde el panel de "Editar secciones". Si no hay override,
 * el componente que use este hook debe seguir mostrando su contenido default
 * (i18n / clase CSS), ya que acá `text`/`imageUrl` vienen `null`.
 *
 * @param {string} city - Id de ciudad (clave de CITY_SECTIONS, ej. "partido_loberia")
 * @param {string} section - Id de sección (ej. "como_llegar")
 * @returns {{ text: string|null, imageUrl: string|null }}
 *
 * @example
 * const { text, imageUrl } = useSectionOverride("partido_loberia", "como_llegar");
 * <p>{text || t("intro_como_llegar_partido_loberia")}</p>
 */
export const useSectionOverride = (city, section) => {
  const [override, setOverride] = useState({ text: null, imageUrl: null });

  useEffect(() => {
    let cancelled = false;

    fetch(`${Global.url}sections/${city}/${section}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setOverride({ text: data.text ?? null, imageUrl: resolveApiUrl(data.imageUrl) });
      })
      .catch(() => {
        if (!cancelled) setOverride({ text: null, imageUrl: null });
      });

    return () => {
      cancelled = true;
    };
  }, [city, section]);

  return override;
};

/**
 * Estilo inline con el mismo tamaño/recorte que usa la regla compartida de
 * `city.css` para las imágenes de portada de sección. Pensado para las pocas
 * secciones cuya clase CSS nunca tuvo esa regla (nunca tuvieron imagen por
 * defecto) — se aplica solo cuando hay `imageUrl`, para no dejar un recuadro
 * vacío en las secciones que todavía no tienen ninguna imagen cargada.
 *
 * @param {string} imageUrl
 * @returns {React.CSSProperties}
 *
 * @example
 * <div className="photo-historia-partido-loberia" style={imageUrl ? sectionImageStyle(imageUrl) : undefined} />
 */
export const sectionImageStyle = (imageUrl) => ({
  backgroundImage: `url(${imageUrl})`,
  width: "100%",
  height: "500px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  marginBottom: "2rem",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
});
