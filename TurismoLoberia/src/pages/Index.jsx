import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";
import React from "react";

export const Index = () => {
  return (
    <div className="index">
      <Header />
      <ControlledCarousel />
      <Footer />
    </div>
  );
};

export default Index;
