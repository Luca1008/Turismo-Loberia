import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import "../../styles/stickyButton.css";

/**
 * Componente `ScrollToTopButton`
 *
 * Muestra un botón flotante que permite al usuario desplazarse suavemente
 * hasta la parte superior de la página cuando ha hecho scroll hacia abajo.
 *
 * - El botón aparece cuando el scroll vertical supera los 300px.
 * - Utiliza `window.scrollTo` con comportamiento suave.
 *
 * @component
 *
 * @returns {JSX.Element} Botón flotante de "volver arriba".
 *
 * @example
 * <ScrollToTopButton />
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons">
      {isVisible && (
        <button
          className="scroll-button"
          onClick={scrollToTop}
          title="Volver arriba"
        >
          <MdKeyboardDoubleArrowUp size={40} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
