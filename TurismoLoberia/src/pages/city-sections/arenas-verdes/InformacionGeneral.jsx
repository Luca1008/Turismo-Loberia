import React from "react";
import { useTranslation, Trans } from "react-i18next";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  return (
    <section id="informacion_general" className="information">
      <div className="portada-arenas-verdes"></div>
      <Trans components={{ p: <p /> }}>{data_arenas.descripcion_1}</Trans>
      <Trans components={{ p: <p /> }}>{data_arenas.descripcion_2}</Trans>
    </section>
  );
};

export default InformacionGeneral;
