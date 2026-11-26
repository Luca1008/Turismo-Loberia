import React from "react";
import { useTranslation } from "react-i18next";
import { LuMap } from "react-icons/lu";
import "../../../styles/mosaicSection.css";

const Descargas = () => {
  const { t } = useTranslation();

  return (
    <section className="download" id="descargas">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("descargas")}</h2>
        <div className="title-underline"></div>
      </div>
    </section>
  );
};

export default Descargas;
