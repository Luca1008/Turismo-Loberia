import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import WheatherCard from "../components/cards/WheatherCard";

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
        <WheatherCard ciudad="Loberia" />
        <WheatherCard ciudad="San Manuel" />
        <WheatherCard ciudad="Arenas Verdes" lat={-38.5457} lon={-58.5567} />
      </div>
      <Footer />
    </div>
  );
};

export default Clima;
