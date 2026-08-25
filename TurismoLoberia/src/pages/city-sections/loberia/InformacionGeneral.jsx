import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const InformacionGeneral = () => {
  const { t } = useTranslation();
  const data_descripcion = t("descripcion_ciudad_loberia", {
    returnObjects: true,
  });

  return (
    <section id="informacion_general" className="information-city-loberia">
      <div className="portada-loberia"></div>
      <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
        {data_descripcion.introduccion}
      </Trans>
      <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
        {data_descripcion.calles}
      </Trans>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.parque}
        </Trans>
      </div>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.camino_sirga}
        </Trans>
      </div>
      <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
        {data_descripcion.vida_cultural_intro}
      </Trans>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.museo_historia_natural}
        </Trans>
      </div>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.museo_historico}
        </Trans>
      </div>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.fiestas_populares}
        </Trans>
      </div>
      <div className="item-location">
        <MdOutlineAddLocationAlt />
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.automovilismo}
        </Trans>
      </div>
      <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
        {data_descripcion.cierre}
      </Trans>
    </section>
  );
};

export default InformacionGeneral;
