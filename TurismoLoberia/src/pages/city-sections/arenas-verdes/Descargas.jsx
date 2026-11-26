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
          filePath="/downloads/arenas_verdes/info_aves_arenas_verdes.pdf"
          fileName="Info Arenas Verdes"
          label="Descargar PDF - Info Arenas Verdes"
          className="accent-pill-button accent-neutral"
        />
        <DownloadButton
          filePath="/downloads/arenas_verdes/alojamientos_arenas_verdes.pdf"
          fileName="Alojamientos Arenas Verdes"
          label="Descargar PDF - Alojamientos Arenas Verdes"
          className="accent-pill-button accent-neutral"
        />
        <DownloadButton
          filePath="/downloads/arenas_verdes/aves_arenas_verdes.pdf"
          fileName="Aves Arenas Verdes"
          label="Descargar PDF - Aves Arenas Verdes"
          className="accent-pill-button accent-neutral"
        />
      </div>
    </section>
  );
};

export default Descargas;
