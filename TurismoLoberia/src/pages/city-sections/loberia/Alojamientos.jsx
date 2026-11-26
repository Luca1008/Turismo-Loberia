import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuBedDouble } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import usePageMeta from "../../../hooks/usePageMeta";
import CityPhoto from "../../../components/common/CityPhoto";
import alojamientoImg from "../../../assets/images/loberia/alojamiento.jpg";
import "../../../styles/mosaicSection.css";
import AccommodationDirectory from "../../../components/alojamientos/AccommodationDirectory";

const Alojamientos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "alojamientos");
  // Título y descripción propios para que la sección aparezca en Google al
  // buscar "alojamientos Lobería" (ver también public/sitemap.xml).
  usePageMeta({
    title: t("alojamientos_loberia_meta.titulo"),
    description: t("alojamientos_loberia_meta.descripcion"),
    path: "/Loberia/alojamientos",
  });

  return (
    <section className="accommodation" id="alojamientos">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("alojamientos")}</h2>
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
        <p className="mosaic-copy">{text || t("alojamientos_loberia_descripcion")}</p>
      </div>
      <AccommodationDirectory cityKey="loberia" />
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic alojamiento",
            label: "Lobería",
          });
          navigate("/Buscador", {
            state: {
              category: "Alojamiento",
              city: "Lobería",
            },
          });
        }}
      />
    </section>
  );
};

export default Alojamientos;
