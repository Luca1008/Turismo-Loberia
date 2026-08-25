import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FaCar, FaBus } from "react-icons/fa";
import { TbMapRoute } from "react-icons/tb";

const ComoLlegar = () => {
  const { t } = useTranslation();

  return (
    <section className="go-to" id="como_llegar">
      <h2>{t("como_llegar")}</h2>
      <div className="photo-como-llegar-loberia"></div>
      {/* Transporte en auto */}
      <div className="car">
        <p>
          <strong className="primary">
            <FaCar />
            {t("en_auto")}
          </strong>{" "}
        </p>
        <div>
          {Object.values(
            t("como_llegar_partido_loberia", { returnObjects: true })
          ).map((item, index) => (
            <div key={index} className="mb-4">
              <p>
                <TbMapRoute className="route-icon" />
                <strong>{item.descripcion}:</strong>
              </p>
              {Array.isArray(item.rutas) && (
                <ul className="list-disc pl-5">
                  {item.rutas.map((ruta, i) => (
                    <li key={i} className="route-item">
                      {ruta}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <Trans
          i18nKey="intro_2_como_llegar_partido_loberia"
          components={{ br: <br /> }}
        />
      </div>

      {/* Transporte en micro */}
      <div className="bus">
        <p>
          <strong className="primary">
            <FaBus />
            {t("en_micro")}
          </strong>{" "}
        </p>
        <Trans i18nKey="descripcion_en_micro" components={{ br: <br /> }} />
        <ul>
          <li>
            <TbMapRoute className="route-icon" />
            <Trans
              i18nKey="opcion_desde_buenos_aires"
              components={{ br: <br /> }}
            />
          </li>
          <li>
            <TbMapRoute className="route-icon" />
            <Trans
              i18nKey="opcion_desde_mar_del_plata"
              components={{ br: <br /> }}
            />
          </li>
        </ul>
      </div>
      <p>{t("cierre_como_llegar_partido_loberia")}</p>
    </section>
  );
};

export default ComoLlegar;
