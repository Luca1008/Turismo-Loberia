import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Alojamientos = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="accommodation" id="alojamientos">
      <h2>{t("alojamientos")}</h2>
      <div className="photo-alojamiento-loberia"></div>
      <p>{t("alojamientos_loberia_descripcion")}</p>
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
