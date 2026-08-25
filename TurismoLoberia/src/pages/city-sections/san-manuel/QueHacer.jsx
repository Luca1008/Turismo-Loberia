import React from "react";
import { useTranslation, Trans } from "react-i18next";

const QueHacer = () => {
  const { t } = useTranslation();

  return (
    <section className="event" id="que_hacer">
      <h2>{t("que_hacer_san_manuel")}</h2>
      <div className="photo-que-hacer-san-manuel"></div>
      <Trans
        components={{
          p: <p />,
          h3: <h3 className="h3-margin-top" />,
          ul: <ul />,
          li: <li />,
        }}
        i18nKey="que_hacer_san_manuel_descripcion"
      />
    </section>
  );
};

export default QueHacer;
