import React from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "../../../components/ui/DownloadButton";

const Descargas = () => {
  const { t } = useTranslation();

  return (
    <section className="download" id="descargas">
      <h2>{t("descargas")}</h2>
      <DownloadButton
        filePath="/downloads/loberia/camino_de_sirga.pdf"
        fileName="Camino de Sirga"
        label="Descargar PDF - Camino de Sirga"
        className="button"
      />
      <DownloadButton
        filePath="/downloads/loberia/corredor_biologico_camino_de_los_curros.pdf"
        fileName="Corredor Biológico Camino de los Curros"
        label="Descargar PDF - Corredor Biológico Camino de los Curros"
        className="button"
      />
    </section>
  );
};

export default Descargas;
