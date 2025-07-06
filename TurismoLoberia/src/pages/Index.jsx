import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";
import React from "react";

import {
  MdHotel,
  MdOutlineRestaurant,
  MdPlace,
  MdMuseum,
} from "react-icons/md";
import { FaPaintBrush, FaInfo } from "react-icons/fa";

export const Index = () => {
  return (
    <div className="index">
      <Header />
      <ControlledCarousel />
      <section className="services">
        <h2>Guía de Servicios</h2>
        <div className="item-services-container">
          <div className="item-services">
            <MdHotel />
            <p>Alojamientos</p>
          </div>
          <div className="item-services">
            <MdOutlineRestaurant />
            <p>Gastronomía</p>
          </div>
          <div className="item-services">
            <MdPlace />
            <p>Lugares Interés</p>
          </div>
          <div className="item-services">
            <FaPaintBrush />
            <p>Artesanos</p>
          </div>
          <div className="item-services">
            <MdMuseum />
            <p>Servicios Públicos</p>
          </div>
          <div className="item-services">
            <FaInfo />
            <p>Info Útil</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
