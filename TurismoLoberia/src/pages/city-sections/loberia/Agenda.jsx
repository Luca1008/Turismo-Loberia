import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  LuMap,
  LuCompass,
  LuCalendarDays,
  LuSun,
  LuFlower2,
  LuCalendarHeart,
} from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import agendaImg from "../../../assets/images/loberia/agenda.jpg";
import "../../../styles/mosaicSection.css";
import AgendaSeasons from "../../../components/agenda/AgendaSeasons";

/** Ícono y color de acento de cada temporada, en el orden de los datos. */
const SEASON_STYLES = [
  { Icon: LuSun, accent: "orange" },
  { Icon: LuFlower2, accent: "green" },
  { Icon: LuCalendarHeart, accent: "blue" },
];

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { text, imageUrl } = useSectionOverride("ciudad_loberia", "agenda");

  return (
    <section className="agenda" id="agenda">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("agenda_loberia")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || agendaImg} alt={t("agenda_loberia")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <div className="mosaic-card mosaic-card-wide mosaic-green reveal-item">
        <LuCalendarDays className="mosaic-card-icon" aria-hidden="true" />
        <p className="mosaic-copy">{text || t("agenda_loberia_descripcion")}</p>
      </div>

      <AgendaSeasons
        data={t("fiestas_loberia", { returnObjects: true })}
        groupStyles={SEASON_STYLES}
      />
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic eventos",
            label: "Lobería",
          });
          navigate("/Buscador", { state: { category: "Evento" } });
        }}
      />
    </section>
  );
};

export default Agenda;
