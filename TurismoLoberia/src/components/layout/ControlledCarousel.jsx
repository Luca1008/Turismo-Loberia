import React, { useRef } from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../../assets/images/carousel-index/carousel-1.jpg';
import carousel2 from '../../assets/images/carousel-index/carousel-2.jpg';
import carousel3 from '../../assets/images/carousel-index/carousel-3.jpg';

export const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const carousel = useRef(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="carousel-index" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={carousel1} alt="First slide" />
        <Carousel.Caption>
          <h2>Lobería</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={carousel2} alt="Second slide" />
        <Carousel.Caption>
          <h2>Arenas Verdes</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={carousel3} alt="Third slide" />
        <Carousel.Caption>
          <h2>San Manuel</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};