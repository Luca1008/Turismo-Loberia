import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const Suscribirse = () => {
  return (
    <div>
      <Header />
      <div className="suscribirse">
        <h1>Suscribirse</h1>
        <p>¡Gracias por tu interés en suscribirte!</p>
        <p>
          Pronto podrás recibir noticias y actualizaciones sobre el Partido de
          Lobería.
        </p>
        <p>
          Por favor, mantente atento a nuestras redes sociales y sitio web para
          más información.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Suscribirse;
