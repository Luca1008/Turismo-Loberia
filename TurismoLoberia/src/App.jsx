
import { BrowserRouter } from 'react-router-dom';
import ScrollToHash from './components/common/ScrollToHash';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Routing } from './router/Routing';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="layout">
        <Header />
        <main>
          <Routing />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
