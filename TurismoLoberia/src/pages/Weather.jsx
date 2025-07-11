import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import WeatherCard from "../components/cards/WeatherCard";
import WeatherCarousel from "../components/layout/WeatherCarousel";

export const Clima = () => {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default Clima;
