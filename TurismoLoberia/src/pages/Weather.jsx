import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const Clima = () => {
  return (
    <div>
      <Header />
      <h1>Clima en Lobería</h1>
      <p>
        El clima en Lobería es templado y húmedo, con veranos frescos e
        inviernos suaves.
      </p>
      <p>
        La temperatura promedio anual es de 15°C, con máximas de 25°C en verano
        y mínimas de 5°C en invierno.
      </p>
      <p>
        La precipitación anual es de aproximadamente 800 mm, siendo más
        frecuente en otoño y primavera.
      </p>
      <p>
        Los vientos predominantes son del este y noreste, lo que influye en la
        temperatura y la humedad.
      </p>
      <Footer />
    </div>
  );
};

export default Clima;
