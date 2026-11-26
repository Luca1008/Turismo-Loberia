import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuBedDouble } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import alojamientoImg from "../../../assets/images/san_manuel/alojamiento.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";

const Alojamientos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("san_manuel", "alojamientos");

  const handleButtonClick = (category, city) => {
    trackEvent({
      category: "Botón",
      action: `Clic ${category.toLowerCase()}`,
      label: city,
    });
    navigate("/Buscador", { state: { category, city } });
  };

  return (
    <section className="accommodation" id="alojamientos">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <Trans components={{ h2: <h2 /> }} i18nKey="alojamientos_san_manuel" />
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || alojamientoImg} alt={t("alojamientos")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>

      <div className="mosaic-card mosaic-card-wide mosaic-blue reveal-item">
        <LuBedDouble className="mosaic-card-icon" aria-hidden="true" />
        <p className="mosaic-copy">{text || t("alojamientos_san_manuel_descripcion")}</p>
      </div>
      <ButtonSuccess
        onClick={() => handleButtonClick("Alojamiento", "San Manuel")}
      />
    </section>
  );
};

export default Alojamientos;
