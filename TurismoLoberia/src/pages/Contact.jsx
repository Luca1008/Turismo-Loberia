import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const Contacto = () => {
  return (
    <div>
      <Header />
      <h1>Contacto</h1>
      <p>
        Para más información, puedes contactarnos a través de nuestras redes
        sociales o enviarnos un correo electrónico.
      </p>
      <p>
        Estamos aquí para ayudarte con cualquier consulta que tengas sobre el
        Partido de Lobería.
      </p>
      <p>¡Esperamos tu mensaje!</p>
      <Footer />
    </div>
  );
};

export default Contacto;
