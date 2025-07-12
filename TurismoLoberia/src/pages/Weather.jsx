import React from "react";
import WeatherCard from "../components/cards/WeatherCard";
import WeatherCarousel from "../components/layout/WeatherCarousel";

export const Clima = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <WeatherCarousel compact/>
        <WeatherCard ciudad="Lobería" />
        <WeatherCard ciudad="San Manuel" />
        <WeatherCard ciudad="Arenas Verdes" lat={-38.8083} lon={-58.6036} />
      </div>
    </div>
  );
};

export default Clima;
