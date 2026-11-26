import React, { useEffect, useState } from "react";
import ContentCard from "../components/cards/ContentCard";
import EventBanner from "../components/cards/EventBanner";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";
import { Global } from "../helpers/Global";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../components/common/ButtonSuccess";
import WeatherCarousel from "../components/layout/WeatherCarousel";
import { useTranslation } from "react-i18next";
import "../styles/button.css";
import { trackEvent } from "../analytics";
import { Trans } from "react-i18next";
import "../styles/index.css";
import "../styles/mosaicSection.css";
import artesanos_icon from "../assets/icons/services/artesanos.svg";
import lugares_interes_icon from "../assets/icons/services/interes.svg";
import serv_publicos_icon from "../assets/icons/services/serv_publicos.svg";
import gastronomia_icon from "../assets/icons/services/gastronomia.svg";
import alojamientos_icon from "../assets/icons/services/alojamientos.svg";
import info_util_icon from "../assets/icons/services/info_util.svg";
import { Banner2 } from "../components/layout/Banner2";
import ReservaNaturalBanner from "../components/layout/ReservaNaturalBanner";
import {
  LuMap,
  LuMountain,
  LuFootprints,
  LuHeart,
  LuCalendar,
  LuNewspaper,
  LuLeaf,
  LuCompass,
  LuCloudSun,
  LuMegaphone,
  LuMapPin,
  LuWaves,
  LuSun,
  LuTrees,
  LuCamera,
} from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
/**
 * Componente `Index`
 *
 * Página principal de la aplicación.
 * Renderiza:
 * - Carrusel principal (`ControlledCarousel`)
 * - Sección de servicios con navegación a categorías
 * - Banner promocional de la Reserva Natural
 * - Sección "Descubrí Lobería" (mosaico con el texto de presentación)
 * - Banner "Lobería Te Invita" (`Banner2`)
 * - Próximos eventos
 * - Información adicional con `WeatherCarousel` y plugin de Facebook
 *
 * Funcionalidades:
 * - Carga de datos desde API (`/cards`) para próximos eventos
 * - Navegación a buscador con estado de categoría usando `useNavigate`
 * - Tracking de interacciones mediante `trackEvent`
 * - Animación de carga del iframe de Facebook
 *
 * Hooks usados:
 * - `useState` para manejar estados locales (`eventos`, `iframeLoaded`, `isVisible`)
 * - `useEffect` para:
 *    - Alternar visibilidad del spinner del iframe
 *    - Cargar los próximos eventos al montar el componente
 * - `useTranslation` para traducciones de textos
 *
 * Componentes usados:
 * - `EventBanner` para mostrar los próximos eventos
 * - `ControlledCarousel` para el carrusel principal
 * - `ButtonSuccess` para botones de ver más
 * - `WeatherCarousel` para mostrar información meteorológica
 * - `ReservaNaturalBanner` / `Banner2` para los banners promocionales
 *
 * @component
 * @returns {JSX.Element} Página principal con carrusel, servicios, lugares de interés, eventos y más información
 */

export const Index = () => {
  /** Estado para almacenar los lugares de interés */
  const [interes, setInteres] = useState([]);
  /** Estado para almacenar los lugares de gastronomía
  const [gastronomia, setGastronomia] = useState([]);*/
   /** Estado para almacenar los alojamientos 
  const [alojamientos, setAlojamientos] = useState([]);*/
  /** Estado para almacenar los próximos eventos */
  const [eventos, setEventos] = useState([]);
  /** Estado para controlar si el iframe de Facebook se cargó */
  const [iframeLoaded, setIframeLoaded] = useState(false);

  /**
 * Hook `useNavigate` de React Router
 *
 * Permite programáticamente navegar a otras rutas de la aplicación.
 * Se usa para redirigir al usuario al buscador según la categoría seleccionada.
 *
 * Ejemplo de uso:
 * navigate("/Buscador", { state: { category: "Alojamiento" } });
 *
 * @constant {function} navigate - Función para cambiar de ruta programáticamente
 */

  const navigate = useNavigate();
 /** Estado para alternar visibilidad del spinner del iframe */

  const [isVisible, setIsVisible] = useState(true);
  /**
 * Hook `useTranslation` de react-i18next
 *
 * Proporciona funciones para internacionalización (i18n):
 * - `t(key)` → Traduce la clave proporcionada según el idioma activo
 * - `i18n` → Objeto que permite manipular la configuración de idioma
 *
 * Ejemplo de uso:
 * t("guia_servicios") // Devuelve el texto traducido
 * i18n.language // Devuelve el idioma activo, ej. "es" o "en"
 *
 * @constant {function} t - Función para traducir textos según el idioma activo
 * @constant {object} i18n - Objeto de configuración de i18n (idioma actual, cambio de idioma, etc.)
 */
  const { t, i18n } = useTranslation();
  const inicioMosaic = t("inicio_mosaic", { returnObjects: true });

/** Alterna la visibilidad del spinner de Facebook cada 800ms */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  /** Carga los datos de las distintas categorías al montar el componente */
  useEffect(() => {
    fetch(`${Global.url}cards?category=Interes&limit=6&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const cards = data.cards || data;
        setInteres(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar lugares de interés:", err);
        setInteres([]);
      });

   /*  fetch(`${Global.url}cards?category=Gastronomia&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const cards = data.cards || data;
        setGastronomia(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar Gastronmía:", err);
        setGastronomia([]);
      }); */

    /* fetch(`${Global.url}cards?category=Alojamiento&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const cards = data.cards || data;
        setAlojamientos(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar alojamientos:", err);
        setAlojamientos([]);
      }); */

    fetch(`${Global.url}cards?category=Evento&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const cards = data.cards || data;
        setEventos(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar eventos:", err);
        setEventos([]);
      });
  }, []);

  return (
    <div className="index" key={i18n.language}>
      {/* Carrusel principal */}
      <ControlledCarousel
        renderCaption={(caption, link) => (
          <div className="hero-caption">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-bar"></span>
              {t("destino_destacado")}
            </span>
            <h1 className="text-shadow">
              <a href={link}>{caption}</a>
            </h1>
            <p className="hero-subtitle">{t("hero_subtitulo")}</p>
          </div>
        )}
      />
      {/* Sección de servicios */}
      <section className="services">
        <LuLeaf className="deco-float" aria-hidden="true" style={{ top: "10%", left: "4%", fontSize: "2.5rem" }} />
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("guia_servicios")}</h2>
        <div className="title-underline"></div>
        <div className="item-services-container">
          {/* Cada servicio redirige al buscador y registra evento */}
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Alojamiento",
              });
              navigate("/Buscador", { state: { category: "Alojamiento" } });
            }}
          >
            <img src={alojamientos_icon} alt="alojamientos" />
            <p>{t("alojamientos")}</p>
          </div>
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Gastronomía",
              });
              navigate("/Buscador", { state: { category: "Gastronomia" } });
            }}
          >
            <img src={gastronomia_icon} alt="gastronomia" />
            <p>{t("gastronomia")}</p>
          </div>
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Lugares de Interés",
              });
              navigate("/Buscador", {
                state: { category: "Interes" },
              });
            }}
          >
            <img src={lugares_interes_icon} alt="lugares de interes" />
            <p>{t("lugares_interes")}</p>
          </div>
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Artesanos",
              });
              navigate("/Buscador", { state: { category: "Artesanos" } });
            }}
          >
            <img src={artesanos_icon} alt="artesanos" />
            <p>{t("artesanos")}</p>
          </div>
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Servicios Públicos",
              });
              navigate("/Buscador", {
                state: { category: "ServPublicos" },
              });
            }}
          >
            <img src={serv_publicos_icon} alt="servicios publicos" />
            <p>{t("servicios_publicos")}</p>
          </div>
          <div
            className="item-services"
            onClick={() => {
              trackEvent({
                category: "Servicios",
                action: "Clic en servicio",
                label: "Información Útil",
              });
              navigate("/Buscador", {
                state: { category: "InfoUtil" },
              });
            }}
          >
            <img src={info_util_icon} alt="info util" />
            <p>{t("info_util")}</p>
          </div>
        </div>
      </section>

      {/* Banner promocional de la Reserva Natural */}
      <ReservaNaturalBanner />

      {/* Sección de lugares: mosaico con el texto de presentación de Lobería,
          seguido de las tarjetas de "Interés" (datos reales desde la API). */}
      <section className="places">
        <LuCompass className="deco-pulse" aria-hidden="true" style={{ top: "8%", right: "5%", fontSize: "3rem" }} />
        <div className="section-eyebrow">
          <LuCompass aria-hidden="true" />
          <span>{t("eyebrow_experiencias")}</span>
        </div>
        <h1>{t("descubri_loberia")}</h1>
        <div className="title-underline places-title-underline"></div>

        <Trans components={{ h3: <h3 className="section-lead" /> }}>
          {inicioMosaic.lead}
        </Trans>

        <div className="mosaic-list">
          <article className="mosaic-card mosaic-green mosaic-tilt-1 reveal-item reveal-delay-1">
            <LuMountain className="mosaic-watermark" aria-hidden="true" />
            <LuMountain className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
              }}
            >
              {inicioMosaic.paisaje}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-orange mosaic-tilt-2 reveal-item reveal-delay-2">
            <LuFootprints className="mosaic-watermark" aria-hidden="true" />
            <LuFootprints className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
              }}
            >
              {inicioMosaic.experiencias}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-blue mosaic-tilt-3 reveal-item reveal-delay-3">
            <LuHeart className="mosaic-watermark" aria-hidden="true" />
            <LuHeart className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
              }}
            >
              {inicioMosaic.esencia}
            </Trans>
          </article>
        </div>

        <Trans components={{ p: <p className="mosaic-closing-text" /> }}>
          {inicioMosaic.cierre}
        </Trans>

        <div className="places-items">
          {interes.map((card) => (
            <ContentCard
              key={card.id}
              id={card.id}
              title={card.card_title}
              description={card.card_description}
              city={card.card_city}
              img={card.card_img_portada}
              category={card.card_category}
              variant="showcase"
            />
          ))}
        </div>

        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Ver más",
              label: "Interes",
            });
            navigate("/Buscador", {
              state: { category: "Interes" },
            });
          }}
        />
      </section>
      <Banner2/>
      {/* Próximos eventos */}
      <section className="upcoming-events">
        <div className="section-eyebrow">
          <LuCalendar aria-hidden="true" />
          <span>{t("agenda_cultural")}</span>
        </div>
        <h2>{t("proximos_eventos")}</h2>
        <div className="title-underline events-title-underline"></div>
        {eventos.length === 0 && <p className="pEvent">{t("sin_eventos_intro")}</p>}
        <div className="events">
          {eventos.map((card) => (
            <EventBanner
              key={card.id}
              id={card.id}
              title={card.card_title}
              description={card.card_description}
              city={card.card_city}
              horario={card.card_horario}
              img={card.card_img_portada}
              card_date={card.card_date}
            />
          ))}
        </div>

        {eventos.length > 0 && (
          <ButtonSuccess
            text="Ver más eventos"
            onClick={() => {
              trackEvent({
                category: "Botón",
                action: "Ver más",
                label: "Evento",
              });
              navigate("/Buscador", {
                state: { category: "Evento" },
              });
            }}
          />
        )}
      </section>

      {/* Más información */}
      <section className="more-info">
        <LuCloudSun className="deco-float" aria-hidden="true" style={{ top: "8%", left: "4%", fontSize: "3rem" }} />
        <LuMegaphone className="deco-pulse" aria-hidden="true" style={{ bottom: "10%", right: "4%", fontSize: "2.75rem" }} />
        <LuCompass className="deco-bounce" aria-hidden="true" style={{ top: "12%", right: "8%", fontSize: "3.5rem" }} />
        <LuLeaf className="deco-float" aria-hidden="true" style={{ bottom: "20%", left: "10%", fontSize: "2.5rem", transform: "rotate(20deg)" }} />
        <LuMapPin className="deco-pulse" aria-hidden="true" style={{ top: "45%", right: "3%", fontSize: "2.25rem" }} />
        <LuNewspaper className="deco-bounce" aria-hidden="true" style={{ bottom: "6%", left: "42%", fontSize: "2.5rem" }} />
        <LuWaves className="deco-float" aria-hidden="true" style={{ top: "30%", left: "1%", fontSize: "2.75rem" }} />
        <LuSun className="deco-pulse" aria-hidden="true" style={{ top: "4%", left: "30%", fontSize: "2.25rem" }} />
        <LuTrees className="deco-bounce" aria-hidden="true" style={{ bottom: "32%", right: "18%", fontSize: "3rem" }} />
        <LuCamera className="deco-float" aria-hidden="true" style={{ top: "55%", left: "22%", fontSize: "2.25rem", transform: "rotate(-15deg)" }} />
        <LuMountain className="deco-pulse" aria-hidden="true" style={{ bottom: "2%", left: "6%", fontSize: "3rem" }} />
        <LuFootprints className="deco-bounce" aria-hidden="true" style={{ top: "60%", right: "24%", fontSize: "2.5rem", transform: "rotate(10deg)" }} />
        <LuHeart className="deco-float" aria-hidden="true" style={{ top: "20%", right: "30%", fontSize: "2rem" }} />
        <LuCalendar className="deco-pulse" aria-hidden="true" style={{ bottom: "42%", right: "1%", fontSize: "2.25rem" }} />
        <div className="info-header">
          <div className="section-eyebrow">
            <LuNewspaper aria-hidden="true" />
            <span>{t("info_al_dia")}</span>
          </div>
          <h2>{t("actualidad")}</h2>
          <div className="title-underline"></div>
        </div>
        <div className="container-info">
          {/* Carrusel del clima */}
          <div className="weather-wrapper">
            <WeatherCarousel />
          </div>

          {/* Plugin de Facebook con spinner mientras carga */}
          <div className="facebook-container">
            <div className="facebook-card-header">
              <span className="facebook-card-badge">
                <FaFacebookF aria-hidden="true" />
              </span>
              <div>
                <div className="facebook-card-title">Turismo Lobería</div>
                <div className="facebook-card-subtitle">En Facebook</div>
              </div>
            </div>
            {!iframeLoaded && (
              <div className="fb-logo-spinner-container">
                <div
                  className={`fb-logo-spinner ${
                    isVisible ? "visible" : "hidden"
                  }`}
                >
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 18c0-8.837-7.163-16-16-16S2 9.163 2 18c0 7.99 5.847 14.604 13.5 15.804V23.5h-4V18h4v-3.5c0-4.142 3.358-7.5 7.5-7.5h3v5h-3c-1.381 0-2.5 1.119-2.5 2.5V18h4.5l-1 5.5H22v10.804C29.153 32.604 34 25.99 34 18z"
                      fill="#1877F2"
                    />
                    <path
                      d="M24.5 23.5L25.5 18H22v-3.5c0-1.381 1.119-2.5 2.5-2.5h3v-5h-3c-4.142 0-7.5 3.358-7.5 7.5V18h-4v5.5h4v10.804a16.096 16.096 0 005 0V23.5h3.5z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
                <p className="fb-loading-text">
                  <strong>Cargando contenido...</strong>
                </p>
              </div>
            )}
            <iframe
              className="facebook-iframe"
              title="Plugin de página de Facebook de Turismo Lobería"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floberiaturismo&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="500"
              height="600"
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              style={{
                border: "none",
                overflow: "hidden",
                width: "100%",
                height: "600px",
                display: iframeLoaded ? "block" : "none",
              }}
              onLoad={() => {
                setIframeLoaded(true);
                trackEvent({
                  category: "Facebook",
                  action: "Carga de iframe",
                  label: "Plugin FB",
                });
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
