import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherCardCompact from "../cards/WeatherCardCompact";
import { Global } from "../../helpers/Global";

const defaultLocations = [
  { ciudad: "Arenas Verdes", lat: -38.967, lon: -59.005 },
  { ciudad: "San Manuel" },
  { ciudad: "Loberia" },
];

const WeatherCarousel = ({ locations = defaultLocations, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [weatherData, setWeatherData] = useState(
    Array(locations.length).fill(null)
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % locations.length);
    }, interval);
    return () => clearInterval(timer);
  }, [locations.length, interval, isPaused]);

  useEffect(() => {
    // Obtener datos del clima para cada ciudad solo una vez al montar
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
    // eslint-disable-next-line
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

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
