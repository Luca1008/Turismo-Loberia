import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuMap, LuCompass, LuBus } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
// Reusa la foto de partido_loberia: esta sección nunca tuvo su propio asset
// "transporte.jpg" (bug preexistente en la clase CSS que ya usaba); se
// mantiene la misma imagen que se mostraba antes.
import transporteImg from "../../../assets/images/partido_loberia/transporte.jpg";
import "../../../styles/mosaicSection.css";

const Transporte = () => {
  const { t } = useTranslation();
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "transporte");

  return (
    <section className="transport" id="transporte">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("transporte")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || transporteImg} alt={t("transporte")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuBus className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
          {text ? (
            <p>{text}</p>
          ) : (
            <Trans
              i18nKey="transporte_loberia_descripcion"
              components={{ p: <p />, strong: <strong />, h3: <h3 className="story-intro" /> }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Transporte;
