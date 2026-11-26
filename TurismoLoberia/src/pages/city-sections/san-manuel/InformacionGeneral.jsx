import React from "react";
import { useTranslation } from "react-i18next";
import { LuMap, LuCompass, LuChurch } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import portadaImg from "../../../assets/images/san_manuel/portada.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const { text, imageUrl } = useSectionOverride("san_manuel", "informacion_general");
  const data = t("descripcion_san_manuel", { returnObjects: true });

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
          <CityPhoto src={imageUrl || portadaImg} alt={t("san_manuel")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>

      {/* Si el texto se editó desde el panel, reemplaza toda la descripción
          (antes era un único párrafo con ambas ideas): se muestra solo ese
          texto para no duplicar el contenido del mosaico. */}
      {text ? (
        <p>{text}</p>
      ) : (
        <>
          <p>{data.intro}</p>
          <div className="mosaic-list mosaic-list-1">
            <article className="mosaic-card mosaic-green mosaic-tilt-1 mosaic-compact reveal-item reveal-delay-1">
              <LuChurch className="mosaic-watermark" aria-hidden="true" />
              <LuChurch className="mosaic-card-icon" aria-hidden="true" />
              <p className="mosaic-copy">{data.patrimonio}</p>
            </article>
          </div>
        </>
      )}
    </section>
  );
};

export default InformacionGeneral;
