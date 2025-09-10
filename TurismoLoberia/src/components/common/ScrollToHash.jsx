import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook `ScrollToHash`
 *
 * Permite desplazarse automáticamente a un elemento de la página
 * cuyo `id` coincida con el hash de la URL.
 * 
 * Se utiliza típicamente en rutas de React Router para hacer scroll suave
 * a secciones internas de la página cuando se accede a una URL con hash.
 *
 * @component
 *
 * @example
 * // Coloca este componente en tu layout o página principal
 * <ScrollToHash />
 */
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -127; // Ajuste para header fijo
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
}
