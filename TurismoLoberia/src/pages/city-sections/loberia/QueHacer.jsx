import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuMap, LuCompass, LuSparkles } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import queHacerImg from "../../../assets/images/loberia/que_hacer.jpg";
import "../../../styles/mosaicSection.css";

const QueHacer = () => {
  const { t } = useTranslation();
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "que_hacer");

  return (
    <section className="event" id="que_hacer">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("que_hacer_loberia")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || queHacerImg} alt={t("que_hacer_loberia")} />
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
            <Trans
              i18nKey="que_hacer_loberia_descripcion"
              components={{
                p: <p />,
                h2: <h2 />,
                h3: <h3 />,
                span: <span className="font-semibold" />,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default QueHacer;
