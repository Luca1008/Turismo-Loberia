import React from "react";
import { useTranslation } from "react-i18next";

const Transporte = () => {
  const { t } = useTranslation();

  return (
    <section className="transport" id="transporte">
      <h2>{t("transporte")}</h2>
      <div className="photo-transporte-san-manuel"></div>
      <p>{t("transport_sanManuel")}</p>
    </section>
  );
};

export default Transporte;
