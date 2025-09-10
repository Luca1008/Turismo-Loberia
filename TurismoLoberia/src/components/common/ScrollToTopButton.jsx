import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import "../../styles/stickyButton.css";

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
