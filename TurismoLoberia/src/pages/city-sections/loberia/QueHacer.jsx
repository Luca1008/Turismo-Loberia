import React from "react";
import { useTranslation, Trans } from "react-i18next";

const QueHacer = () => {
  const { t } = useTranslation();

  return (
    <section className="event" id="que_hacer">
      <h2>{t("que_hacer_loberia")}</h2>
      <div className="photo-que-hacer-loberia"></div>
      <Trans
        i18nKey="que_hacer_loberia_descripcion"
        components={{
          p: <p />,
          h2: <h2 />,
          h3: <h3 />,
          span: <span className="font-semibold" />,
        }}
      />
    </section>
  );
};

export default QueHacer;
