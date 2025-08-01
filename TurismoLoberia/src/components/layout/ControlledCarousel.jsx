import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/index.css';

// Puedes poner tus imágenes default en assets o en public
import defaultArenas from '../../assets/images/carousel-index/default-arenas.jpg';
import defaultLoberia from '../../assets/images/carousel-index/default-loberia.jpg';
import defaultSanManuel from '../../assets/images/carousel-index/default-sanmanuel.jpg';

const cities = [
  { key: "loberia", caption: "Lobería", defaultImg: defaultLoberia },
  { key: "arenas_verdes", caption: "Arenas Verdes", defaultImg: defaultArenas },
  { key: "san_manuel", caption: "San Manuel", defaultImg: defaultSanManuel }
];

export const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    Promise.all(
      cities.map(async (city) => {
        const res = await fetch(`http://localhost:5000/api/carousel/${city.key}`);
        const data = await res.json();
        // Si hay imagen subida, úsala; si no, usa la default
        return data.images[0]
          ? { src: `http://localhost:5000${data.images[0].url}`, caption: city.caption }
          : { src: city.defaultImg, caption: city.caption };
      })
    ).then((imgs) => setCarouselImages(imgs));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="carousel-index" activeIndex={index} onSelect={handleSelect}>
      {carouselImages.map((img, i) => (
        <Carousel.Item key={i}>
          <img src={img.src} alt={img.caption} />
          <Carousel.Caption>
            <h1>{img.caption}</h1>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};