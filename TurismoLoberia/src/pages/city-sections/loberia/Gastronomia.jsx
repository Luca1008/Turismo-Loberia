import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Gastronomia = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="gastronomy" id="gastronomia">
      <h2>{t("gastronomia")}</h2>
      <div className="photo-gastronomia-loberia"></div>
      <Trans
        i18nKey="gastronomia_loberia_descripcion"
        components={{ p: <p />, span: <span className="font-semibold" /> }}
      />
      <ButtonSuccess
        onClick={() => {
          trackEvent({
            category: "Botón",
            action: "Clic gastronomía",
            label: "Lobería",
          });
          navigate("/Buscador", {
            state: {
              category: "Gastronomia",
              city: "Lobería",
            },
          });
        }}
      />
    </section>
  );
};

export default Gastronomia;
