import React from "react";
import "../styles/city.css";

const Loberia = () => {
  return (
    <div className="city">
      <h1>Lobería</h1>
      <div className="portada-city">
      </div>
      <section className="information">
        <h2>Información</h2>
        <p>
          Lobería es un destino ubicado en el sudeste de la Provincia de Buenos
          Aires, Argentina. Rodeado de paisajes naturales, historia y
          tradiciones, el Partido de Lobería invita a descubrir sus pueblos, su
          costa atlántica y la calidez de su gente.
        </p>
      </section>
      <section className="history">
        <h2>Historia</h2>
        <p>
          Fundada oficialmente en 1891, Lobería tiene raíces que se remontan al
          siglo XIX con las estancias rurales y las primeras familias pioneras.
        </p>
        <div className="photo"></div>
      </section>
      <section className="nature">
        <h2>Naturaleza</h2>
        <p>
          Lobería cuenta con un entorno natural privilegiado: playas agrestes,
          sierras bajas, arroyos y reservas ecológicas. Es ideal para el
          ecoturismo, la observación de aves y actividades al aire libre.
        </p>
        <div className="photo"></div>
      </section>
      <section className="go-to">
        <h2>Cómo Llegar</h2>
        <p>
          Lobería está ubicada a 470 km de Buenos Aires, a 130 km de Mar del
          Plata y a 50 km de Necochea. Se puede llegar en auto, micro o
          combinando tren + colectivo desde Tandil.
        </p>
        <div className="photo"></div>
      </section>
    </div>
  );
};

export default Loberia;
