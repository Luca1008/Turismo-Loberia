import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="agenda" id="agenda">
      <h2>{t("agenda")}</h2>
      <div className="photo-agenda-arenas-verdes"></div>
      <p>Durante el verano se realizan actividades...</p>
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
