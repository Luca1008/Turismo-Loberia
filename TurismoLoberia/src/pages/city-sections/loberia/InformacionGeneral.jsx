import React from "react";
import { useTranslation, Trans } from "react-i18next";
import {
  LuTrees,
  LuFootprints,
  LuMicroscope,
  LuLandmark,
  LuPartyPopper,
  LuFlagTriangleRight,
  LuMap,
  LuCompass,
} from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import portadaImg from "../../../assets/images/loberia/portada.jpg";
import "../../../styles/storySection.css";
import "../../../styles/comoLlegarPartido.css";
import "../../../styles/mosaicSection.css";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_descripcion = t("descripcion_ciudad_loberia", {
    returnObjects: true,
  });
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "informacion_general");

  return (
    <section id="informacion_general" className="information-city-loberia">
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
          <CityPhoto src={imageUrl || portadaImg} alt={t("ciudad_loberia")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      {text ? (
        <p>{text}</p>
      ) : (
        <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
          {data_descripcion.introduccion}
        </Trans>
      )}
      <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
        {data_descripcion.calles}
      </Trans>

      <div className="mosaic-list mosaic-list-2">
        <article className="mosaic-card mosaic-green mosaic-tilt-1 reveal-item reveal-delay-1">
          <LuTrees className="mosaic-watermark" aria-hidden="true" />
          <LuTrees className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.parque}
            </Trans>
          </div>
        </article>

        <article className="mosaic-card mosaic-blue mosaic-tilt-2 reveal-item reveal-delay-2">
          <LuFootprints className="mosaic-watermark" aria-hidden="true" />
          <LuFootprints className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.camino_sirga}
            </Trans>
          </div>
        </article>
      </div>

      <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
        {data_descripcion.vida_cultural_intro}
      </Trans>

      <div className="mosaic-list mosaic-list-4">
        <article className="mosaic-card mosaic-blue mosaic-tilt-2 reveal-item reveal-delay-1">
          <LuMicroscope className="mosaic-watermark" aria-hidden="true" />
          <LuMicroscope className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.museo_historia_natural}
            </Trans>
          </div>
        </article>

        <article className="mosaic-card mosaic-orange mosaic-tilt-3 reveal-item reveal-delay-2">
          <LuLandmark className="mosaic-watermark" aria-hidden="true" />
          <LuLandmark className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.museo_historico}
            </Trans>
          </div>
        </article>

        <article className="mosaic-card mosaic-orange mosaic-tilt-2 reveal-item reveal-delay-3">
          <LuPartyPopper className="mosaic-watermark" aria-hidden="true" />
          <LuPartyPopper className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.fiestas_populares}
            </Trans>
          </div>
        </article>

        <article className="mosaic-card mosaic-blue mosaic-tilt-3 reveal-item reveal-delay-4">
          <LuFlagTriangleRight className="mosaic-watermark" aria-hidden="true" />
          <LuFlagTriangleRight className="mosaic-card-icon" aria-hidden="true" />
          <div className="mosaic-copy">
            <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
              {data_descripcion.automovilismo}
            </Trans>
          </div>
        </article>
      </div>

      <Trans components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}>
        {data_descripcion.cierre}
      </Trans>
    </section>
  );
};

export default InformacionGeneral;
