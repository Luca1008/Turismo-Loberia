import React from "react";
import { FaBolt, FaCloud, FaCloudRain, FaMoon, FaSmog, FaSnowflake, FaSun } from "react-icons/fa";

const iconosOWMtoFa = {
  "01d": FaSun, "01n": FaMoon,
  "02d": FaCloud, "02n": FaCloud,
  "03d": FaCloud, "03n": FaCloud,
  "04d": FaCloud, "04n": FaCloud,
  "09d": FaCloudRain, "09n": FaCloudRain,
  "10d": FaCloudRain, "10n": FaCloudRain,
  "11d": FaBolt, "11n": FaBolt,
  "13d": FaSnowflake, "13n": FaSnowflake,
  "50d": FaSmog, "50n": FaSmog,
};

const obtenerClaseIcono = (codigoIcono) => {
  const clases = {
    "01d": "icono-sol", "01n": "icono-luna",
    "02d": "icono-nube", "02n": "icono-nube-noche",
    "03d": "icono-nube", "03n": "icono-nube-noche",
    "04d": "icono-nube", "04n": "icono-nube-noche",
    "09d": "icono-lluvia", "09n": "icono-lluvia-noche",
    "10d": "icono-lluvia", "10n": "icono-lluvia-noche",
    "11d": "icono-tormenta", "11n": "icono-tormenta-noche",
    "13d": "icono-nieve", "13n": "icono-nieve-noche",
    "50d": "icono-niebla", "50n": "icono-niebla-noche",
  };
  return clases[codigoIcono] || "icono-nube";
};

const WeatherCardCompact = ({ ciudad, temp, icon, descripcion }) => {
  const Icono = iconosOWMtoFa[icon] || FaCloud;
  const claseIcono = `${obtenerClaseIcono(icon)} compact-icon`;
  return (
    <div className="weather-card-compact">
      <div className="compact-city">{ciudad}</div>
      <Icono size={32} className={claseIcono} />
      <div className="compact-temp">{temp !== undefined ? Math.round(temp) + "°" : "-"}</div>
      {descripcion && <div className="compact-desc">{descripcion}</div>}
    </div>
  );
};

export default WeatherCardCompact; 