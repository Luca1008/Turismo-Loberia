import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Gastronomia = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  return (
    <section className="gastronomy" id="gastronomia">
      <h2>{t("gastronomia_arenas_verdes")}</h2>
      <div className="photo-gastronomia-arenas-verdes"></div>
      <Trans components={{ p: <p />, strong: <strong /> }}>
        {data_arenas.gastronomia}
      </Trans>
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic gastronomía",
            label: "Arenas Verdes",
          });
          navigate("/Buscador", {
            state: {
              category: "Gastronomia",
              city: "Arenas Verdes",
            },
          });
        }}
      />
    </section>
  );
};

export default Gastronomia;
