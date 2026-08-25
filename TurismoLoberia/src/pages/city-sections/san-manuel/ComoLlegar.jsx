import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FaCar } from "react-icons/fa";
import { TbMapRoute } from "react-icons/tb";

const ComoLlegar = () => {
  const { t } = useTranslation();

  return (
    <section className="go-to" id="como_llegar">
      <h2>{t("como_llegar")}</h2>
      <div className="photo-como-llegar-san-manuel"></div>
      <Trans components={{ p: <p /> }} i18nKey="como_llegar_san_manuel.titulo" />
      <p>
        <strong className="primary">
          <FaCar /> {t("en_auto")}
        </strong>
      </p>
      <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon" />
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_loberia"
        />
      </div>
      <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon" />
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_tandil"
        />
      </div>
      <div className="item-location">
        <TbMapRoute className="route-icon" />
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_necochea"
        />
      </div>
    </section>
  );
};

export default ComoLlegar;
