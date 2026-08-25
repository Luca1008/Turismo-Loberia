import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Producciones = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <section id="producciones" className="information">
      <h2>{t("producciones")}</h2>
      <div className="photo-produccion-partido-loberia"></div>
      <Trans components={{ p: <p /> }}>{data_intro.economia.intro}</Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.economia.produccion}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.economia.productos}
      </Trans>
      <br />
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.cierre}
      </Trans>
    </section>
  );
};

export default Producciones;
