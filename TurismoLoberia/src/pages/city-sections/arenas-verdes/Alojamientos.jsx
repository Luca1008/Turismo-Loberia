import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuBedDouble } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import alojamientoImg from "../../../assets/images/arenas_verdes/alojamiento.jpg";
import "../../../styles/mosaicSection.css";
import AccommodationDirectory from "../../../components/alojamientos/AccommodationDirectory";

const Alojamientos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("arenas_verdes", "alojamientos");

  return (
    <section className="accommodation" id="alojamientos">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("alojamientos_arenas_verdes")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || alojamientoImg} alt={t("alojamientos_arenas_verdes")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-blue reveal-item">
        <LuBedDouble className="mosaic-card-icon" aria-hidden="true" />
        <div className="mosaic-copy">
          {text ? (
            <p>{text}</p>
          ) : (
            <Trans components={{ p: <p />, strong: <strong />, h3: <h3 className="story-intro" /> }}>
              {data_arenas.alojamiento}
            </Trans>
          )}
        </div>
      </div>
      <Trans
        i18nKey="alojamientos_arenas_verdes_descripcion"
        components={{
          p: <p />,
          h2: <h2 />,
          h3: <h3 />,
          ul: <ul />,
          li: <li />,
          br: <br />,
          strong: <strong />,
        }}
      />
      <AccommodationDirectory cityKey="arenas_verdes" />
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic alojamiento",
            label: "Arenas Verdes",
          });
          navigate("/Buscador", {
            state: {
              category: "Alojamiento",
              city: "Arenas Verdes",
            },
          });
        }}
      />
    </section>
  );
};

export default Alojamientos;
