import React from "react";
import { Trans } from "react-i18next";
import "../../styles/agendaLoberia.css";

/**
 * Componente `AgendaSeasons`
 *
 * Agenda de fiestas agrupada por temporada (o por cualquier otro grupo):
 * cada grupo tiene un encabezado con ícono, título y una etiqueta opcional
 * de período, y sus eventos se muestran como tarjetas blancas con una
 * franja del color de acento del grupo. Compartido por la Agenda de
 * Ciudad de Lobería y la de San Manuel.
 *
 * @component
 * @param {Object} data - Contenido traducido.
 * @param {string} [data.intro] - Texto introductorio (subtítulo verde).
 * @param {Array} data.temporadas - Grupos: { titulo, periodo?, eventos: [{ titulo, fecha?, texto }] }.
 *   `texto` admite <strong> para destacar palabras.
 * @param {string} [data.cierre] - Frase de cierre (cita verde).
 * @param {Array} groupStyles - { Icon, accent } por grupo, en el mismo orden
 *   que `data.temporadas` (accent: "orange" | "green" | "blue").
 */
const AgendaSeasons = ({ data, groupStyles }) => {
  if (!data || !Array.isArray(data.temporadas)) return null;

  return (
    <>
      {data.intro && <p className="section-lead agenda-lead">{data.intro}</p>}

      {data.temporadas.map((temporada, index) => {
        const { Icon, accent } = groupStyles[index % groupStyles.length];
        return (
          <div
            key={temporada.titulo}
            className={`agenda-season agenda-${accent} reveal-item reveal-delay-${
              (index % 4) + 1
            }`}
          >
            <header className="agenda-season-header">
              <span className="agenda-season-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="agenda-season-title">{temporada.titulo}</h3>
              {temporada.periodo && (
                <span className={`accent-chip accent-${accent}`}>
                  {temporada.periodo}
                </span>
              )}
            </header>

            <ul
              className={`agenda-events agenda-events-${Math.min(
                temporada.eventos.length,
                4
              )}`}
            >
              {temporada.eventos.map((evento) => (
                <li key={evento.titulo} className="agenda-event">
                  {evento.fecha && (
                    <span className="agenda-event-date">{evento.fecha}</span>
                  )}
                  <h4 className="agenda-event-title">{evento.titulo}</h4>
                  <p className="agenda-event-text">
                    <Trans components={{ strong: <strong /> }}>
                      {evento.texto}
                    </Trans>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {data.cierre && (
        <blockquote className="mosaic-quote agenda-closing">
          {data.cierre}
        </blockquote>
      )}
    </>
  );
};

export default AgendaSeasons;
