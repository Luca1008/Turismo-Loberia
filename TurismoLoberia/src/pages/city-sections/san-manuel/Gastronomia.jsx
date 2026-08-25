import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/common/ButtonSuccess";
import { trackEvent } from "../../../analytics";

const Gastronomia = () => {
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
    <section className="gastronomy" id="gastronomia">
      <h2>{t("gastronomia")}</h2>
      <div className="photo-gastronomia-san-manuel"></div>
      <p>{t("gastronomia_sanManuel")}</p>
      <ButtonSuccess onClick={() => handleButtonClick("Gastronomia", "San Manuel")} />
    </section>
  );
};

export default Gastronomia;
