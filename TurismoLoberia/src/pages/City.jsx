import React from "react";
import { useParams } from "react-router-dom";

export const Ciudad = () => {
  const { nombreCiudad } = useParams(); // capturamos el parámetro

  return (
    <div>
      <div className="ciudad">
        <h1>{nombreCiudad}</h1>
        <p>¡Bienvenido a la Ciudad de Lobería!</p>
        <p>
          La Ciudad de Lobería es un lugar lleno de historia, cultura y belleza
          natural.
        </p>
        <p>
          Explora nuestros parques, museos y disfruta de la hospitalidad de
          nuestra gente.
        </p>
        <p>
          Pronto podrás encontrar más información sobre eventos, lugares de
          interés y actividades en nuestra ciudad.
        </p>
      </div>
    </div>
  );
};

export default Ciudad;
