import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuMap, LuCompass, LuSparkles } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import queHacerImg from "../../../assets/images/san_manuel/que_hacer.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";

const QueHacer = () => {
  const { t } = useTranslation();
  // Contenido estructurado (h3/ul) sin un párrafo principal aislado:
  // solo la imagen es editable acá, el texto queda fijo.
  const { imageUrl } = useSectionOverride("san_manuel", "que_hacer");

  return (
    <section className="event" id="que_hacer">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("que_hacer_san_manuel")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || queHacerImg} alt={t("que_hacer_san_manuel")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>

      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuSparkles className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
          <Trans
            components={{
              p: <p />,
              h3: <h3 className="h3-margin-top" />,
              ul: <ul />,
              li: <li />,
            }}
            i18nKey="que_hacer_san_manuel_descripcion"
          />
        </div>
      </div>
    </section>
  );
};

export default QueHacer;
