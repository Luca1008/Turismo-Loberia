import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Transporte = () => {
  const { t } = useTranslation();

  return (
    <section className="transport" id="transporte">
      <h2>{t("transporte")}</h2>
      <div className="photo-transporte-partido-loberia"></div>
      <Trans
        i18nKey="transporte_loberia_descripcion"
        components={{ p: <p />, strong: <strong /> }}
      />
    </section>
  );
};

export default Transporte;
