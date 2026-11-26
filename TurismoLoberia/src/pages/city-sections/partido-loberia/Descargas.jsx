import React from "react";
import { useTranslation } from "react-i18next";
import { LuMap } from "react-icons/lu";
import DownloadButton from "../../../components/ui/DownloadButton";
import "../../../styles/storySection.css";
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
      <div className="reveal-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <DownloadButton
          filePath="/downloads/partido_loberia/camino_de_sirga.pdf"
          fileName="Camino de Sirga"
          label="Descargar PDF Camino de Sirga"
          className="accent-pill-button accent-neutral"
        />
        <DownloadButton
          filePath="/downloads/partido_loberia/ordenanza_reserva_natural.pdf"
          fileName="Ordenanza Reserva Natural"
          label="Descargar Ordenanza N° 2.981-25 - Reserva Natural"
          className="accent-pill-button accent-neutral"
        />
      </div>
    </section>
  );
};

export default Descargas;
