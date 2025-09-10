import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook `ScrollToTop`
 *
 * Permite desplazarse automáticamente hacia la parte superior de la página
 * al navegar entre rutas, ignorando los cambios de hash.
 *
 * Se utiliza típicamente en aplicaciones React Router para asegurar que
 * la vista comience desde arriba al cambiar de página.
 *
 * @component
 *
 * @example
 * // Coloca este componente en tu layout o página principal
 * <ScrollToTop />
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
