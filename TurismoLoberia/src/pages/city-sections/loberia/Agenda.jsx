import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="agenda" id="agenda">
      <h2>{t("agenda_loberia")}</h2>
      <div className="photo-agenda-loberia"></div>
      <p>{t("agenda_loberia_descripcion")}</p>
      <Trans
        i18nKey="fiestas_loberia_descripcion"
        components={{
          p: <p />,
          strong: <strong />,
          h3: <h3 />,
          h2: <h2 />,
          ul: <ul />,
          li: <li />,
        }}
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
