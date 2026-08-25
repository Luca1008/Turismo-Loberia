import React from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "../../../components/ui/DownloadButton";

const Descargas = () => {
  const { t } = useTranslation();

  return (
    <section className="download" id="descargas">
      <h2>{t("descargas")}</h2>
      <DownloadButton
        filePath="/downloads/arenas_verdes/info_aves_arenas_verdes.pdf"
        fileName="Info Arenas Verdes"
        label="Descargar PDF - Info Arenas Verdes"
        className="button"
      />
      <DownloadButton
        filePath="/downloads/arenas_verdes/alojamientos_arenas_verdes.pdf"
        fileName="Alojamientos Arenas Verdes"
        label="Descargar PDF - Alojamientos Arenas Verdes"
        className="button"
      />
      <DownloadButton
        filePath="/downloads/arenas_verdes/aves_arenas_verdes.pdf"
        fileName="Aves Arenas Verdes"
        label="Descargar PDF - Aves Arenas Verdes"
        className="button"
      />
    </section>
  );
};

export default Descargas;
