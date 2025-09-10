import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherCardCompact from "../cards/WeatherCardCompact";
import { Global } from "../../helpers/Global";

/**
 * Ubicaciones por defecto si no se pasan como prop.
 */
const defaultLocations = [
  { ciudad: "Arenas Verdes", lat: -38.967, lon: -59.005 },
  { ciudad: "San Manuel" },
  { ciudad: "Loberia" },
];

/**
 * Componente `WeatherCarousel`
 *
 * Muestra un carrusel automático de tarjetas del clima para varias ubicaciones.
 * Se puede pausar al pasar el mouse y rotar automáticamente cada `interval` milisegundos.
 *
 * @component
 * 
 * @param {Object[]} [locations=defaultLocations] - Lista de ubicaciones a mostrar.
 * @param {string} locations[].ciudad - Nombre de la ciudad.
 * @param {number} [locations[].lat] - Latitud de la ciudad (opcional).
 * @param {number} [locations[].lon] - Longitud de la ciudad (opcional).
 * @param {number} [interval=5000] - Tiempo en milisegundos entre cada cambio de tarjeta.
 *
 * @example
 * <WeatherCarousel
 *   locations={[
 *     { ciudad: "Loberia" },
 *     { ciudad: "San Manuel" },
 *   ]}
 *   interval={3000}
 * />
 */
const WeatherCarousel = ({ locations = defaultLocations, interval = 5000 }) => {
  /** Índice de la tarjeta activa en el carrusel */
  const [activeIndex, setActiveIndex] = useState(0);

  /** Estado para pausar la rotación al pasar el mouse */
  const [isPaused, setIsPaused] = useState(false);

  /** Datos del clima para cada ubicación */
  const [weatherData, setWeatherData] = useState(
    Array(locations.length).fill(null)
  );

  /**
   * Efecto para rotar automáticamente las tarjetas cada `interval`.
   * Se pausa si `isPaused` es true.
   */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % locations.length);
    }, interval);

    return () => clearInterval(timer);
  }, [locations.length, interval, isPaused]);

  /**
   * Efecto para cargar los datos del clima desde la API de Global.
   * Si falla la petición, muestra "Sin datos".
   */
  useEffect(() => {
    locations.forEach((loc, idx) => {
      let url;
      if (loc.lat !== undefined && loc.lon !== undefined) {
        url = `${Global.url}weather?lat=${loc.lat}&lon=${loc.lon}`;
      } else {
        url = `${Global.url}weather?city=${encodeURIComponent(loc.ciudad)}`;
      }

      axios
        .get(url)
        .then((res) => {
          setWeatherData((prev) => {
            const nuevo = [...prev];
            nuevo[idx] = {
              ciudad: loc.ciudad,
              temp: res.data.temp,
              icon: res.data.icon,
              descripcion: res.data.descripcion,
            };
            return nuevo;
          });
        })
        .catch(() => {
          setWeatherData((prev) => {
            const nuevo = [...prev];
            nuevo[idx] = {
              ciudad: loc.ciudad,
              temp: null,
              icon: null,
              descripcion: "Sin datos",
            };
            return nuevo;
          });
        });
    });
  }, [locations]);

  /** Pausa la rotación al pasar el mouse */
  const handleMouseEnter = () => setIsPaused(true);

  /** Reanuda la rotación al salir el mouse */
  const handleMouseLeave = () => setIsPaused(false);

  /** Datos del clima de la tarjeta activa */
  const currentWeather = weatherData[activeIndex];

  return (
    <div
      className="weather-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="active-weather-card">
        {currentWeather ? (
          <WeatherCardCompact {...currentWeather} />
        ) : (
          <div style={{ minWidth: 90, minHeight: 90 }}></div>
        )}
      </div>
    </div>
  );
};

export default WeatherCarousel;
