import React from "react";
import { useTranslation } from "react-i18next";

const Descargas = () => {
  const { t } = useTranslation();

  return (
    <section className="download" id="descargas">
      <h2>{t("descargas")}</h2>
    </section>
  );
};

export default Descargas;
