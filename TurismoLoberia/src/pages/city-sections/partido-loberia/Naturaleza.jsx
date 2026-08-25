import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Naturaleza = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <section id="naturaleza" className="information">
      <h2>{t("naturaleza")}</h2>
      <div className="photo-naturaleza-partido-loberia"></div>
      <Trans components={{ h3: <h3 className="h3-city" /> }}>
        {data_intro.paisaje.titulo}
      </Trans>
      <br />
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.paisaje.mar}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.paisaje.sierras}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.paisaje.campo}
      </Trans>
      <Trans components={{ p: <p /> }}>{data_intro.paisaje.cierre}</Trans>
    </section>
  );
};

export default Naturaleza;
