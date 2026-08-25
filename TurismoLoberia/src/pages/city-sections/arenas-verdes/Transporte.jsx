import React from "react";
import { useTranslation } from "react-i18next";

const Transporte = () => {
  const { t } = useTranslation();

  return (
    <section className="transport" id="transporte">
      <h2>{t("transporte")}</h2>
      <p>{t("transporte_arenas_verdes")}</p>
    </section>
  );
};

export default Transporte;
