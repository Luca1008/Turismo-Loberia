import React from "react";
import { Trans } from "react-i18next";

const InformacionGeneral = () => {
  return (
    <section id="informacion_general" className="information">
      <div className="portada-san-manuel"></div>
      <Trans components={{ p: <p /> }} i18nKey="descripcion_san_manuel" />
    </section>
  );
};

export default InformacionGeneral;
