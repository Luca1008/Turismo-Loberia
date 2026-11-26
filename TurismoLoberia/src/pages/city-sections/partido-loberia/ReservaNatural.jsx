import React from "react";
import { useTranslation } from "react-i18next";
import { FaDove, FaCamera, FaHiking, FaLeaf } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { LuMap, LuCompass, LuWaves } from "react-icons/lu";
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
import "../../../styles/storySection.css";
import "../../../styles/partidoPhotoFrame.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";

/** Coordenadas de la Reserva Natural Municipal de Objetivos Mixtos. */
const RESERVA_LAT = -38.552472;
const RESERVA_LON = -58.575667;

const COA_LOBERIA = "Club de Observadores de Aves Lobería";

const EXPERIENCIAS = {
  aves: {
    icon: FaDove,
    img: observarAvesImg,
    credit: COA_LOBERIA,
    mosaicColor: "mosaic-green",
  },
  fotografia: {
    icon: FaCamera,
    img: fotografiaImg,
    credit: `Melisa Gago - ${COA_LOBERIA}`,
    mosaicColor: "mosaic-orange",
  },
  senderismo: {
    icon: FaHiking,
    img: senderismoImg,
    credit: COA_LOBERIA,
    mosaicColor: "mosaic-blue",
  },
  naturaleza: {
    icon: FaLeaf,
    img: naturalezaImg,
    credit: `Edgar Romeo - ${COA_LOBERIA}`,
    mosaicColor: "mosaic-yellow",
  },
};

const ReservaNatural = () => {
  const { t } = useTranslation();
  const data = t("intro_reserva_natural", { returnObjects: true });

  return (
    <section id="reserva_natural" className="reserve bg-pattern-reserve">
      <FaDove className="deco-float" aria-hidden="true" style={{ top: "10%", left: "5%", fontSize: "3rem" }} />
      <LuWaves className="deco-bounce" aria-hidden="true" style={{ top: "55%", right: "6%", fontSize: "3rem" }} />

      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{data.nombre}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="photo-container reveal-item">
          <div className="photo-frame-adventure">
            <CityPhoto
              src={portadaImg}
              alt={data.nombre}
              credit={`Nahuel Aguirre - ${COA_LOBERIA}`}
            />
            <div className="torn-edge" aria-hidden="true"></div>
            <span className="adventure-badge" aria-hidden="true">
              <LuCompass />
            </span>
          </div>
        </div>

        <p className="reserve-ordenanza">
          <span>{data.ordenanza}</span>
          <a
            href="/downloads/partido_loberia/ordenanza_reserva_natural.pdf"
            download="Ordenanza Reserva Natural.pdf"
            className="accent-pill-button accent-neutral"
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

        <blockquote className="mosaic-quote">{data.cita}</blockquote>
        <p className="reserve-intro">{data.intro}</p>

        <div className="stat-callout">
          <div className="stat-callout-figure">
            <span className="stat-callout-number">{data.unico_stat}</span>
            <h3 className="stat-callout-title">{data.unico_titulo}</h3>
          </div>
          <p className="stat-callout-text">{data.unico_texto}</p>
        </div>

        <div className="map-frame">
          <h3>{t("ubicacion")}</h3>
          <iframe
            title={data.nombre}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              RESERVA_LON - 0.03
            }%2C${RESERVA_LAT - 0.02}%2C${RESERVA_LON + 0.03}%2C${
              RESERVA_LAT + 0.02
            }&layer=mapnik&marker=${RESERVA_LAT}%2C${RESERVA_LON}`}
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
          />
          <br />
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

        <h3>{data.mirador}</h3>
        <div className="photo-container reveal-item">
          <div className="photo-frame-adventure">
            <CityPhoto
              src={miradorImg}
              alt={data.mirador}
              credit={`Susana Gómez - ${COA_LOBERIA}`}
            />
            <div className="torn-edge" aria-hidden="true"></div>
            <span className="adventure-badge" aria-hidden="true">
              <LuCompass />
            </span>
          </div>
        </div>

        <h3>{data.experiencias_titulo}</h3>
        <div className="mosaic-list mosaic-list-4">
          {Object.entries(data.experiencias).map(([key, exp], index) => {
            const { icon: Icon, img, credit, mosaicColor } = EXPERIENCIAS[key];
            const tilt = index % 2 === 0 ? "mosaic-tilt-2" : "mosaic-tilt-3";
            return (
              <article
                key={key}
                className={`mosaic-card ${mosaicColor} ${tilt} reveal-item reveal-delay-${
                  index + 1
                }`}
              >
                <Icon className="mosaic-watermark" aria-hidden="true" />
                <div className="mosaic-card-photo-wrap">
                  <img className="mosaic-card-photo" src={img} alt={exp.titulo} />
                  {credit && (
                    <span className="mosaic-card-photo-credit">{credit}</span>
                  )}
                </div>
                <span className="mosaic-label">{exp.titulo}</span>
                <p className="mosaic-copy">{exp.texto_1}</p>
                <p className="mosaic-copy">{exp.texto_2}</p>
              </article>
            );
          })}
        </div>

        <div className="closing-gallery">
          <div className="photo-container reveal-item">
            <div className="photo-frame-adventure">
              <CityPhoto
                src={rellenoImg}
                alt={data.nombre}
                credit={`Santiago Torres - ${COA_LOBERIA}`}
              />
              <div className="torn-edge" aria-hidden="true"></div>
            </div>
          </div>
          <div className="photo-container reveal-item">
            <div className="photo-frame-adventure">
              <CityPhoto src={cierreImg} alt={data.nombre} contain />
              <div className="torn-edge" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservaNatural;
