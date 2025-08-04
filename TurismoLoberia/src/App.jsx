import AccessibilityButtton from "./components/common/AccessibilityButtton";
import ScrollToHash from "./components/common/ScrollToHash";
import ScrollToTop from "./components/common/ScrollToTop";
import Whatsapp from "./components/common/Whatsapp";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Routing } from "./router/Routing";
import { AuthProvider } from "./context/AuthProvider";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

import { initGA, trackPageview } from "./analytics";

import { useLocation, BrowserRouter } from "react-router-dom";
import { useEffect, useRef } from "react";

function AppContent() {
  const location = useLocation();
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      initGA(); // Inicializa GA una sola vez
      didInit.current = true;
    }
  }, []);

  useEffect(() => {
    trackPageview(location.pathname + location.search); // Trackea cada vista de página
  }, [location]);

  return (
    <AuthProvider>
      <ScrollToTop />
      <ScrollToHash />
      <div className="layout">
        <div id="main-content">
          <Header />
          <Routing />
          <Footer />
        </div>
        <div className="floating-buttons-container">
          <div className="accessibility-container">
            <AccessibilityButtton />
          </div>
          <ScrollToTopButton />
          <Whatsapp />
        </div>
      </div>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
