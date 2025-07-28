import React from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar } from "react-icons/fa";
import { useTranslation } from "react-i18next";



const ArenasVerdes = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("arenas_verdes")}</h1>
      <div className="portada-city"></div>
      <section className="information">
        <p>
          Arenas Verdes es una pequeña localidad costera perteneciente al
          partido de Lobería, en la provincia de Buenos Aires.
          Surgió como un proyecto de desarrollo turístico en una zona de playas
          vírgenes rodeadas de médanos y vegetación autóctona.
        </p>
        <p>
          Su población estable es reducida, pero aumenta considerablemente en
          temporada alta, gracias al turismo nacional.
        </p>
      </section>
      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p>
          <strong>En autobús:</strong> Se puede llegar en colectivo hasta las
          ciudades cercanas: Necochea (45 km) y Lobería (30 km). Desde allí, se
          debe continuar en taxi, remís o vehículo particular hasta Arenas
          Verdes.
        </p>
        <p>
          Las empresas de ómnibus que operan en la zona incluyen Rápido del Sud,
          Costera Criolla y Via TAC, entre otras.
        </p>
        <p>
          <strong><FaCar />En auto desde la ciudad de Buenos Aires:</strong> Tomar
          Autopista Buenos Aires-La Plata y luego la Ruta Provincial 2 hacia Mar
          del Plata. En Mar del Plata, continuar por la Ruta 88 hacia Necochea.
        </p>
        <p>
          Antes de llegar a Necochea, tomar el desvío hacia Lobería por la Ruta
          Provincial 227.
        </p>
        <p>
          Desde Lobería, seguir los carteles hacia Arenas Verdes, por camino
          asfaltado y luego unos kilómetros de ripio bien mantenido.
        </p>
        <p>
          <strong>Distancia total aproximada:</strong> 500 km.{" "}
          <strong>Tiempo estimado:</strong> 6 horas en auto.
        </p>
        <div className="photo"></div>
      </section>
      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>
          La oferta de alojamiento incluye cabañas, casas de alquiler
          temporario, campings y hosterías familiares.
        </p>
        <p>
          No hay grandes hoteles, lo cual contribuye al ambiente tranquilo y
          natural del lugar. Se recomienda reservar con anticipación en
          temporada alta.
        </p>
        <h3 id="base-de-campamentos">{t("base_campamentos")}</h3>
        <p>
          Arenas Verdes cuenta con zonas designadas para acampar, tanto en áreas
          privadas como en espacios públicos autorizados.
        </p>
        <p>
          Los campings ofrecen servicios básicos como parrillas, duchas, baños y
          en algunos casos electricidad y proveeduría.
        </p>
        <ButtonSuccess />
      </section>
      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo"></div>
        <p>
          La gastronomía local se basa en productos frescos, incluyendo pescados
          de la zona y platos caseros.
        </p>
        <p>
          Hay restaurantes y paradores que ofrecen comidas típicas, parrilla,
          minutas y opciones vegetarianas. En temporada alta también hay food
          trucks y ferias gastronómicas.
        </p>
        <ButtonSuccess />
      </section>
      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo"></div>
        <p>
          Durante la temporada alta, algunos servicios turísticos ofrecen
          traslados desde Necochea o Lobería.
        </p>
        <p>
          También se puede llegar en taxi o remís desde localidades cercanas.
        </p>
        <p>
          El micro sale a las 9 desde la Municipalidad y regresa a las 20 hs. Se
          puede reservar lugar comunicándose al 2262-300185 o acercándose a la
          Oficina de Turismo (Juan B. Justo y Belgrano), de lunes a viernes de 7
          a 13 hs.
        </p>
      </section>
      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>
          Durante el verano, se realizan actividades culturales, deportivas y
          recreativas como ferias de artesanos, espectáculos musicales al aire
          libre y torneos de vóley playa o fútbol.
        </p>
        <p>
          Las fechas varían cada año y son organizadas por la municipalidad o
          asociaciones locales.
        </p>
        <ButtonSuccess />
      </section>
      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p>Disfrutar de la playa y los médanos.</p>
        <p>Recorrer senderos en bicicleta o a pie.</p>
        <p>Visitar la zona del arroyo “El Moro”.</p>
        <p>Observar aves y naturaleza en estado puro.</p>
        <p>Practicar pesca deportiva.</p>
        <p>Asistir a actividades culturales y ferias locales.</p>
      </section>
      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>
          Puedes descargar material útil para tu visita como: Mapa turístico,
          listado actualizado de alojamientos y guía gastronómica local.
        </p>
      </section>
    </div>
  );
};

export default ArenasVerdes;
