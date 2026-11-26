import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuMap, LuCompass, LuSparkles, LuWaves } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import queHacerImg from "../../../assets/images/arenas_verdes/que_hacer.jpg";
import "../../../styles/mosaicSection.css";

const QueHacer = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("arenas_verdes", "que_hacer");

  return (
    <section className="event" id="que_hacer">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("que_hacer_arenas_verdes")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || queHacerImg} alt={t("que_hacer_arenas_verdes")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuSparkles className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
          {text ? (
            <p>{text}</p>
          ) : (
            <Trans components={{ p: <p />, h3: <h3 className="story-intro" /> }}>{data_arenas.actividades_intro}</Trans>
          )}
        </div>
      </div>
      <h2>{t("actividades_arenas_verdes")}</h2>
      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuWaves className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
        <Trans
          components={{
            p: <p />,
            strong: <strong />,
            h3: <h3 className="padding-top" />,
          }}
        >
          {data_arenas.mar}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong />,
            h3: <h3 className="padding-top" />,
          }}
        >
          {data_arenas.aire_libre}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong />,
            h3: <h3 className="padding-top" />,
          }}
        >
          {data_arenas.magico}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong />,
            h3: <h3 className="padding-top" />,
          }}
        >
          {data_arenas.experiencia}
        </Trans>
        </div>
      </div>
    </section>
  );
};

export default QueHacer;
