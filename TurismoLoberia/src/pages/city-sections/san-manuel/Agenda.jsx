import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Agenda = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <h2>{t("agenda")}</h2>
      <div className="photo-agenda-san-manuel"></div>
      <Trans
        components={{
          p: <p />,
          h2: <h2 />,
          h3: <h3 className="h3-margin-top" />,
          ul: <ul />,
          li: <li />,
        }}
        i18nKey="agenda_san_manuel"
      />
      <ButtonSuccess onClick={() => handleButtonClick("Evento", "San Manuel")} />
    </section>
  );
};

export default Agenda;
