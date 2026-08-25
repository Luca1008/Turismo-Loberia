import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Alojamientos = () => {
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
    <section className="accommodation" id="alojamientos">
      <Trans components={{ h2: <h2 /> }} i18nKey="alojamientos_san_manuel" />
      <div className="photo-alojamiento-san-manuel"></div>
      <p>{t("alojamientos_san_manuel_descripcion")}</p>
      <ButtonSuccess
        onClick={() => handleButtonClick("Alojamiento", "San Manuel")}
      />
    </section>
  );
};

export default Alojamientos;
