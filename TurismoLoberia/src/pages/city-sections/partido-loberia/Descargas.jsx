import React from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "../../../components/ui/DownloadButton";

const Descargas = () => {
  const { t } = useTranslation();

  return (
    <section className="download" id="descargas">
      <h2>{t("descargas")}</h2>
      <DownloadButton
        filePath="/downloads/partido_loberia/camino_de_sirga.pdf"
        fileName="Camino de Sirga"
        label="Descargar PDF Camino de Sirga"
        className="button"
      />
      <DownloadButton
        filePath="/downloads/partido_loberia/ordenanza_reserva_natural.pdf"
        fileName="Ordenanza Reserva Natural"
        label="Descargar Ordenanza N° 2.981-25 - Reserva Natural"
        className="button"
      />
    </section>
  );
};

export default Descargas;
