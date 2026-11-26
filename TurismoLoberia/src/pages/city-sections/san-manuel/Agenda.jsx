import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LuMap, LuCompass, LuChurch } from "react-icons/lu";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import agendaImg from "../../../assets/images/san_manuel/agenda.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";
import AgendaSeasons from "../../../components/agenda/AgendaSeasons";

const GROUP_STYLES = [{ Icon: LuChurch, accent: "orange" }];

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Contenido estructurado (fiestas en tarjetas, ver AgendaSeasons): solo
  // la imagen es editable acá, el texto queda fijo.
  const { imageUrl } = useSectionOverride("san_manuel", "agenda");

  const handleButtonClick = (category, city) => {
    trackEvent({
      category: "Botón",
      action: `Clic ${category.toLowerCase()}`,
      label: city,
    });
    navigate("/Buscador", { state: { category, city } });
  };

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

      <AgendaSeasons
        data={t("agenda_san_manuel", { returnObjects: true })}
        groupStyles={GROUP_STYLES}
      />
      <ButtonSuccess onClick={() => handleButtonClick("Evento", "San Manuel")} />
    </section>
  );
};

export default Agenda;
