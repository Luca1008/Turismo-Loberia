import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuUtensils } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import gastronomiaImg from "../../../assets/images/loberia/gastronomia.jpg";
import "../../../styles/mosaicSection.css";

const Gastronomia = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "gastronomia");

  return (
    <section className="gastronomy" id="gastronomia">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("gastronomia")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || gastronomiaImg} alt={t("gastronomia")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-yellow reveal-item">
        <LuUtensils className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
          {text ? (
            <p>{text}</p>
          ) : (
            <Trans
              i18nKey="gastronomia_loberia_descripcion"
              components={{ p: <p />, span: <span className="font-semibold" />, h3: <h3 className="story-intro" /> }}
            />
          )}
        </div>
      </div>
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic gastronomía",
            label: "Lobería",
          });
          navigate("/Buscador", {
            state: {
              category: "Gastronomia",
              city: "Lobería",
            },
          });
        }}
      />
    </section>
  );
};

export default Gastronomia;
