import React from "react";
import { useTranslation, Trans } from "react-i18next";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <section id="informacion_general" className="information">
      <div className="portada-city"></div>
      {/* Introducción */}
      <Trans components={{ p: <p /> }}>{data_intro.presentacion}</Trans>
      <br />
      <br />
      {/* Características principales */}
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.caracteristicas}
      </Trans>
    </section>
  );
};

export default InformacionGeneral;
