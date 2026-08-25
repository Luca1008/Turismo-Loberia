import React from "react";
import { useTranslation } from "react-i18next";
import { FaDove, FaCamera, FaHiking, FaLeaf } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { trackEvent } from "../../../analytics";
import CityPhoto from "../../../components/common/CityPhoto";
import portadaImg from "../../../assets/images/partido_loberia/reserva_natural/portada.jpg";
import miradorImg from "../../../assets/images/partido_loberia/reserva_natural/mirador.jpg";
import observarAvesImg from "../../../assets/images/partido_loberia/reserva_natural/observar_aves.jpg";
import fotografiaImg from "../../../assets/images/partido_loberia/reserva_natural/fotografia.jpg";
import senderismoImg from "../../../assets/images/partido_loberia/reserva_natural/senderismo.jpg";
import naturalezaImg from "../../../assets/images/partido_loberia/reserva_natural/naturaleza.jpg";
import rellenoImg from "../../../assets/images/partido_loberia/reserva_natural/relleno.jpg";
import cierreImg from "../../../assets/images/partido_loberia/reserva_natural/cierre.jpg";
import "../../../styles/reservaNatural.css";

/** Coordenadas de la Reserva Natural Municipal de Objetivos Mixtos. */
const RESERVA_LAT = -38.552472;
const RESERVA_LON = -58.575667;

const COA_LOBERIA = "Club de Observadores de Aves Lobería";

const EXPERIENCIAS = {
  aves: {
    icon: FaDove,
    img: observarAvesImg,
    credit: COA_LOBERIA,
  },
  fotografia: {
    icon: FaCamera,
    img: fotografiaImg,
    credit: `Melisa Gago - ${COA_LOBERIA}`,
  },
  senderismo: {
    icon: FaHiking,
    img: senderismoImg,
    credit: COA_LOBERIA,
  },
  naturaleza: {
    icon: FaLeaf,
    img: naturalezaImg,
    credit: `Edgar Romeo - ${COA_LOBERIA}`,
  },
};

const ReservaNatural = () => {
  const { t } = useTranslation();
  const data = t("intro_reserva_natural", { returnObjects: true });

  return (
    <section id="reserva_natural" className="reserve">
      <h2>{data.nombre}</h2>

      <CityPhoto
        src={portadaImg}
        alt={data.nombre}
        credit={`Nahuel Aguirre - ${COA_LOBERIA}`}
      />

      <p className="reserve-ordenanza">
        {data.ordenanza}
        <a
          href="/downloads/partido_loberia/ordenanza_reserva_natural.pdf"
          download="Ordenanza Reserva Natural.pdf"
          className="reserve-ordenanza-link"
          onClick={() =>
            trackEvent({
              category: "Descarga",
              action: "Click descargar Ordenanza Reserva Natural",
              label: data.nombre,
            })
          }
        >
          <FiDownload aria-hidden="true" />
          {data.ordenanza_descarga}
        </a>
      </p>

      <blockquote className="reserve-quote">{data.cita}</blockquote>
      <p>{data.intro}</p>

      <h3>{data.unico_titulo}</h3>
      <p>{data.unico_texto}</p>

      <div className="reserve-map">
        <h3>{t("ubicacion")}</h3>
        <div className="map-container">
          <iframe
            title={data.nombre}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              RESERVA_LON - 0.03
            }%2C${RESERVA_LAT - 0.02}%2C${RESERVA_LON + 0.03}%2C${
              RESERVA_LAT + 0.02
            }&layer=mapnik&marker=${RESERVA_LAT}%2C${RESERVA_LON}`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          <a
            href={`https://www.openstreetmap.org/?mlat=${RESERVA_LAT}&mlon=${RESERVA_LON}#map=14/${RESERVA_LAT}/${RESERVA_LON}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent({
                category: "Mapa",
                action: "Click ver en OpenStreetMap",
                label: data.nombre,
              })
            }
          >
            {t("ver_en_openstreetmap")}
          </a>
        </div>
      </div>

      <h3>{data.mirador}</h3>
      <CityPhoto
        src={miradorImg}
        alt={data.mirador}
        credit={`Susana Gómez - ${COA_LOBERIA}`}
      />

      <h3>{data.experiencias_titulo}</h3>
      <div className="reserve-experiences">
        {Object.entries(data.experiencias).map(([key, exp]) => {
          const { icon: Icon, img, credit } = EXPERIENCIAS[key];
          return (
            <div key={key} className="reserve-experience">
              <h4>
                <Icon className="reserve-experience-icon" aria-hidden="true" />
                {exp.titulo}
              </h4>
              <p className="reserve-experience-lead">{exp.texto_1}</p>
              <CityPhoto src={img} alt={exp.titulo} credit={credit} />
              <p>{exp.texto_2}</p>
            </div>
          );
        })}
      </div>

      <CityPhoto
        src={rellenoImg}
        alt={data.nombre}
        credit={`Santiago Torres - ${COA_LOBERIA}`}
        className="reserve-relleno"
      />
      <CityPhoto src={cierreImg} alt={data.nombre} contain />
    </section>
  );
};

export default ReservaNatural;
