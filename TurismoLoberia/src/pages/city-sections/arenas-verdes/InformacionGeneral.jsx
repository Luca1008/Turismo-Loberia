import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuMap, LuCompass, LuTrees, LuWaves } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import portadaImg from "../../../assets/images/arenas_verdes/portada.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("arenas_verdes", "informacion_general");

  return (
    <section id="informacion_general" className="information">
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
          <CityPhoto src={imageUrl || portadaImg} alt={t("arenas_verdes")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      {text ? (
        <p>{text}</p>
      ) : (
        <Trans components={{ p: <p />, h3: <h3 className="story-intro" /> }}>{data_arenas.descripcion_1}</Trans>
      )}
      <div className="mosaic-list mosaic-list-2">
        <article className="mosaic-card mosaic-green mosaic-tilt-1 mosaic-compact reveal-item reveal-delay-1">
          <LuTrees className="mosaic-watermark" aria-hidden="true" />
          <LuTrees className="mosaic-card-icon" aria-hidden="true" />
          <p className="mosaic-copy">{data_arenas.descripcion_2.paisaje}</p>
        </article>
        <article className="mosaic-card mosaic-blue mosaic-tilt-2 mosaic-compact reveal-item reveal-delay-2">
          <LuWaves className="mosaic-watermark" aria-hidden="true" />
          <LuWaves className="mosaic-card-icon" aria-hidden="true" />
          <p className="mosaic-copy">{data_arenas.descripcion_2.destino}</p>
        </article>
      </div>
    </section>
  );
};

export default InformacionGeneral;
