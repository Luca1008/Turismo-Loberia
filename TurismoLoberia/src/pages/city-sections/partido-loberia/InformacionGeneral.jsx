import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuLeaf, LuDrama, LuWheat, LuMap, LuCompass, LuWaves } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import portadaImg from "../../../assets/images/partido_loberia/portada.jpg";
import "../../../styles/storySection.css";
import "../../../styles/partidoPhotoFrame.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("partido_loberia", "informacion_general");

  return (
    <section id="informacion_general" className="information bg-pattern-bird">
      <LuLeaf className="deco-pulse" aria-hidden="true" style={{ top: "12%", left: "5%", fontSize: "3rem" }} />
      <LuWaves className="deco-bounce" aria-hidden="true" style={{ top: "48%", right: "6%", fontSize: "3.5rem" }} />

      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{t("informacion_general")}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="photo-container reveal-item">
          <div className="photo-frame-adventure">
            <CityPhoto src={imageUrl || portadaImg} alt={t("partido_loberia")} />
            <div className="torn-edge" aria-hidden="true"></div>
            <span className="adventure-badge adventure-badge--lg" aria-hidden="true">
              <LuCompass />
            </span>
          </div>
          <span className="photo-caption">Naturaleza en estado puro — Partido de Lobería</span>
        </div>

        {/* Introducción */}
        {text ? (
          <p className="section-lead">{text}</p>
        ) : (
          <Trans components={{ p: <p className="section-lead" />, h3: <h3 className="story-intro" /> }}>{data_intro.presentacion}</Trans>
        )}

        {/* Características principales, en formato mosaico */}
        <div className="mosaic-list">
          <article className="mosaic-card mosaic-blue mosaic-tilt-1 reveal-item reveal-delay-1">
            <LuLeaf className="mosaic-watermark" aria-hidden="true" />
            <LuLeaf className="mosaic-card-icon" aria-hidden="true" />
            <span className="mosaic-label">{t("diversidad_natural")}</span>
            <p className="mosaic-copy">{data_intro.caracteristicas_detalle.diversidad}</p>
          </article>

          <article className="mosaic-card mosaic-orange mosaic-tilt-2 reveal-item reveal-delay-2">
            <LuDrama className="mosaic-watermark" aria-hidden="true" />
            <LuDrama className="mosaic-card-icon" aria-hidden="true" />
            <span className="mosaic-label">{t("vida_cultural")}</span>
            <p className="mosaic-copy">{data_intro.caracteristicas_detalle.cultura}</p>
          </article>

          <article className="mosaic-card mosaic-yellow mosaic-tilt-3 reveal-item reveal-delay-3">
            <LuWheat className="mosaic-watermark" aria-hidden="true" />
            <LuWheat className="mosaic-card-icon" aria-hidden="true" />
            <span className="mosaic-label">{t("perfil_productivo")}</span>
            <p className="mosaic-copy">{data_intro.caracteristicas_detalle.produccion}</p>
          </article>
        </div>
      </div>

      <LuCompass className="compass-deco" aria-hidden="true" />
    </section>
  );
};

export default InformacionGeneral;
