import React from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const PartidoLoberia = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("partido_loberia")}</h1>
      <div className="portada-city"></div>
      <section className="information">
        <p>
          Lobería es un destino ubicado en el sudeste de la Provincia de Buenos Aires, Argentina.
        </p>
        <p>
          Rodeado de paisajes naturales, historia y tradiciones, el Partido de Lobería invita a descubrir sus pueblos, su costa atlántica y la calidez de su gente.
        </p>
        <p>
          Desde sus playas tranquilas hasta sus campos fértiles, el Partido de Lobería es un destino ideal para aquellos que buscan disfrutar de la naturaleza y la hospitalidad local.
        </p>
      </section>
      <section className="history" id="historia">
        <h2>{t("historia")}</h2>
        <div className="photo"></div>
        <p>
          Fundada oficialmente en 1891, Lobería tiene raíces que se remontan al siglo XIX con las estancias rurales y las primeras familias pioneras.
        </p>
        <p>
          Su nombre proviene de la abundancia de lobos marinos que habitaban las costas del Atlántico Sur.
        </p>
        <p>
          Durante la época colonial, la zona fue utilizada para la cría de ganado y la agricultura, estableciendo las bases de la economía local.
        </p>
        <p>
          A lo largo de los siglos XIX y XX, el partido experimentó un desarrollo significativo con la llegada del ferrocarril y la inmigración europea.
        </p>
        <ButtonSuccess />
      </section>
      <section className="nature" id="naturaleza">
        <h2>{t("naturaleza")}</h2>
        <div className="photo"></div>
        <p>
          Lobería cuenta con un entorno natural privilegiado: playas agrestes, sierras bajas, arroyos y reservas ecológicas.
        </p>
        <p>
          Es ideal para el ecoturismo, la observación de aves y actividades al aire libre.
        </p>
        <p>
          Sus costas albergan una rica biodiversidad marina, incluyendo aves costeras, lobos marinos y diversas especies de peces.
        </p>
        <p>
          En el interior, los campos ofrecen paisajes serranos ideales para el ecoturismo, la observación de aves y actividades al aire libre.
        </p>
        <ButtonSuccess />
      </section>
      <section className="producciones" id="producciones">
        <h2>{t("producciones")}</h2>
        <div className="photo"></div>
        <p>
          La economía del Partido de Lobería se basa principalmente en la agricultura, la ganadería y el turismo.
        </p>
        <p>
          Los campos fértiles permiten el cultivo de cereales, oleaginosas y forrajes, siendo una de las principales zonas productoras de la provincia.
        </p>
        <p>
          La ganadería bovina y ovina tiene una larga tradición en la región, con establecimientos que combinan la producción tradicional con técnicas modernas.
        </p>
        <p>
          El sector turístico ha crecido significativamente en las últimas décadas, aprovechando los atractivos naturales y culturales del partido.
        </p>
        <ButtonSuccess />
      </section>
      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo"></div>
        <p>
          <strong><FaCar />En auto desde Buenos Aires:</strong> Tomar la Autopista Buenos Aires-La Plata y luego la Ruta Provincial 2 hacia Mar del Plata.
        </p>
        <p>
          Continuar por la Ruta 88 hacia Necochea y tomar el desvío hacia Lobería por la Ruta Provincial 227.
        </p>
        <p>
          <strong>Distancia desde Buenos Aires:</strong> Aproximadamente 470 km. <strong>Tiempo estimado:</strong> 5-6 horas en auto.
        </p>
        <p>
          <strong><FaBus />En colectivo:</strong> Varias empresas de transporte interurbano conectan Buenos Aires con Lobería, incluyendo Rápido del Sud y Costera Criolla.
        </p>
        <p>
          <strong><FaTrain />En tren:</strong> El servicio ferroviario conecta Tandil con Lobería, aunque los horarios pueden variar según la temporada.
        </p>
      </section>
      <section className="descargas" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>
          Puedes descargar material útil para tu visita como: Mapa turístico del partido, guía de servicios y folleto informativo.
        </p>
      </section>
    </div>
  );
};

export default PartidoLoberia;
