
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Routing } from './router/Routing';

function App() {
  return (
    <BrowserRouter>
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
