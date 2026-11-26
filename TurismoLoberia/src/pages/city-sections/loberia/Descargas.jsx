import React from "react";
import { useTranslation } from "react-i18next";
import { LuMap } from "react-icons/lu";
import DownloadButton from "../../../components/ui/DownloadButton";
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <DownloadButton
          filePath="/downloads/loberia/camino_de_sirga.pdf"
          fileName="Camino de Sirga"
          label="Descargar PDF - Camino de Sirga"
          className="accent-pill-button accent-neutral"
        />
        <DownloadButton
          filePath="/downloads/loberia/corredor_biologico_camino_de_los_curros.pdf"
          fileName="Corredor Biológico Camino de los Curros"
          label="Descargar PDF - Corredor Biológico Camino de los Curros"
          className="accent-pill-button accent-neutral"
        />
      </div>
    </section>
  );
};

export default Descargas;
