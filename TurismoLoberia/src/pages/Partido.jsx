import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const Partido = () => {
  return (
    <div>
      <Header />
      <div className="partido">
        <h1>Partido de Lobería</h1>
        <p>
          El Partido de Lobería es una hermosa región ubicada en la provincia de
          Buenos Aires, Argentina. Conocido por su rica historia, paisajes
          naturales y tradiciones culturales, Lobería ofrece una experiencia
          única a sus visitantes.
        </p>
        <p>
          Desde sus playas tranquilas hasta sus campos fértiles, el Partido de
          Lobería es un destino ideal para aquellos que buscan disfrutar de la
          naturaleza y la hospitalidad local.
        </p>
        <p>
          Pronto podrás encontrar más información sobre actividades, eventos y
          lugares para visitar en el Partido de Lobería.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Partido;
