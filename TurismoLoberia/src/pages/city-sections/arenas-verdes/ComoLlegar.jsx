import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FaCar } from "react-icons/fa";
import { TbMapRoute } from "react-icons/tb";

const ComoLlegar = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  return (
    <section className="go-to" id="como_llegar">
      <h2>{t("como_llegar")}</h2>
      <div className="photo-como-llegar-arenas-verdes"></div>
      <p>
        <strong className="primary">
          <FaCar />
          {t("en_auto")}
        </strong>
      </p>
      <Trans components={{ p: <p /> }}>{data_arenas.como_llegar_intro}</Trans>
      <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon" />
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_loberia}
        </Trans>
      </div>
      <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon" />
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_necochea}
        </Trans>
      </div>
      <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon" />
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_mar_del_plata}
        </Trans>
      </div>
    </section>
  );
};

export default ComoLlegar;
