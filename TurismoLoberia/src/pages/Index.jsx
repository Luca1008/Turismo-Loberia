import {Header} from '../components/layout/Header';
import {Footer} from '../components/layout/Footer';
import React from 'react';

export const Index = () => {
  return (
    <div className="index">
      <Header />
      <Header />
      <main>
        <h2>Contenido principal</h2>
        <p>Bienvenido a la página de inicio</p>
      </main>
      <Footer />

    </div>
  );
};

export default Index;