import React from "react";
import WeatherCard from "../components/cards/WeatherCard";
import '../styles/weather.css';

export const Clima = () => {
  return (
    <div>
      <section className="section-weather">
        <WeatherCard ciudad="Lobería" />
        <WeatherCard ciudad="San Manuel" />
        <WeatherCard ciudad="Arenas Verdes" lat={-38.8083} lon={-58.6036} />
      </section>
    </div>
  );
};

export default Clima;
