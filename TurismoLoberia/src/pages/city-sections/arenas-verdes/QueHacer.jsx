import React from "react";
import { useTranslation, Trans } from "react-i18next";

const QueHacer = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  return (
    <section className="event" id="que_hacer">
      <h2>{t("que_hacer_arenas_verdes")}</h2>
      <div className="photo-que-hacer-arenas-verdes"></div>
      <Trans components={{ p: <p /> }}>{data_arenas.actividades_intro}</Trans>
      <h2>{t("actividades_arenas_verdes")}</h2>
      <Trans
        components={{
          p: <p />,
          strong: <strong />,
          h3: <h3 className="padding-top" />,
        }}
      >
        {data_arenas.mar}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong />,
          h3: <h3 className="padding-top" />,
        }}
      >
        {data_arenas.aire_libre}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong />,
          h3: <h3 className="padding-top" />,
        }}
      >
        {data_arenas.magico}
      </Trans>
      <Trans
        components={{
          p: <p />,
          strong: <strong />,
          h3: <h3 className="padding-top" />,
        }}
      >
        {data_arenas.experiencia}
      </Trans>
    </section>
  );
};

export default QueHacer;
