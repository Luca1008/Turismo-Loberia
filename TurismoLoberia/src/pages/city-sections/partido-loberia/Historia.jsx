import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Historia = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <section id="historia" className="information">
      <h2>{t("historia")}</h2>
      <div className="photo-historia-partido-loberia"></div>
      <Trans components={{ h3: <h3 className="h3-city" /> }}>
        {data_intro.cultura.titulo}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.cultura.identidad}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.cultura.historia}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong className="font-semibold mt-2" />,
        }}
      >
        {data_intro.cultura.talento}
      </Trans>
    </section>
  );
};

export default Historia;
