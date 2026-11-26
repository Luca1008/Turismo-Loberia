import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuCalendarDays } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import agendaImg from "../../../assets/images/arenas_verdes/agenda.jpg";
import "../../../styles/mosaicSection.css";

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("arenas_verdes", "agenda");

  return (
    <section className="agenda" id="agenda">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("agenda")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || agendaImg} alt={t("agenda")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuCalendarDays className="mosaic-card-icon" aria-hidden="true" />
        <p className="mosaic-copy">{text || "Durante el verano se realizan actividades..."}</p>
      </div>
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic eventos",
            label: "Arenas Verdes",
          });
          navigate("/Buscador", {
            state: {
              category: "Evento",
              city: "Arenas Verdes",
            },
          });
        }}
      />
    </section>
  );
};

export default Agenda;
