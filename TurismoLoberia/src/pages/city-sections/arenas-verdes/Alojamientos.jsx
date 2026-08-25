import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Alojamientos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  return (
    <section className="accommodation" id="alojamientos">
      <h2>{t("alojamientos_arenas_verdes")}</h2>
      <div className="photo-alojamiento-arenas-verdes"></div>
      <Trans components={{ p: <p />, strong: <strong /> }}>
        {data_arenas.alojamiento}
      </Trans>
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
