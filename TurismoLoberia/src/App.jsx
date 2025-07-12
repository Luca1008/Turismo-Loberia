
import { BrowserRouter } from 'react-router-dom';
import AccessibilityButtton from './components/common/AccessibilityButtton';
import ScrollToHash from './components/common/ScrollToHash';
import ScrollToTop from './components/common/ScrollToTop';
import Whatsapp from './components/common/Whatsapp';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Routing } from './router/Routing';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <div className="layout">
        <Header />
        <main id="main-content">
          <Routing />
        </main>
        <Footer />
        <div className="floating-buttons-container">
          <div className="accessibility-container">
            <AccessibilityButtton />
          </div>
          <Whatsapp />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
