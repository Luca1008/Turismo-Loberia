import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuUtensils } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import gastronomiaImg from "../../../assets/images/san_manuel/gastronomia.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";

const Gastronomia = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("san_manuel", "gastronomia");

  const handleButtonClick = (category, city) => {
    trackEvent({
      category: "Botón",
      action: `Clic ${category.toLowerCase()}`,
      label: city,
    });
    navigate("/Buscador", { state: { category, city } });
  };

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
        <p className="mosaic-copy">{text || t("gastronomia_sanManuel")}</p>
      </div>
      <ButtonSuccess onClick={() => handleButtonClick("Gastronomia", "San Manuel")} />
    </section>
  );
};

export default Gastronomia;
