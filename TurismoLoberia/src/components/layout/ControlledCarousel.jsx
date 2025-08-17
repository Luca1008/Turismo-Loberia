import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/controlled-carousel.css";
import { Global } from "../../helpers/Global";
import defaultArenas from "../../assets/images/carousel-index/default-arenas.jpg";
import defaultLoberia from "../../assets/images/carousel-index/default-loberia.jpg";
import defaultSanManuel from "../../assets/images/carousel-index/default-sanmanuel.jpg";

const defaultCities = [
  {
    key: "loberia",
    caption: "Lobería",
    defaultImg: defaultLoberia,
    link: "/Loberia",
  },
  {
    key: "arenas_verdes",
    caption: "Arenas Verdes",
    defaultImg: defaultArenas,
    link: "/ArenasVerdes",
  },
  {
    key: "san_manuel",
    caption: "San Manuel",
    defaultImg: defaultSanManuel,
    link: "/SanManuel",
  },
];

export const ControlledCarousel = ({
  cities = defaultCities,
  renderCaption = (caption, link) => (
    <h1>
      <a href={link}>{caption}</a>
    </h1>
  ),
}) => {
  const [index, setIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    Promise.all(
      cities.map(async (city) => {
        try {
          const res = await fetch(`${Global.apiUrl}carousel/${city.key}`);
          const data = await res.json();

          return {
            src: data.images?.[0]?.url
              ? `${Global.baseUrl}${data.images[0].url.replace(/^\//, "")}`
              : city.defaultImg,
            caption: city.caption,
            link: city.link,
          };
        } catch (error) {
          console.error(`Error loading image for ${city.key}:`, error);
          return {
            src: city.defaultImg,
            caption: city.caption,
            link: city.link,
          };
        }
      })
    ).then(setCarouselImages);
  }, [cities]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages]);
  return (
    <Carousel
      className="carousel-index"
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      pause={false}
      fade
    >
      {carouselImages.map((img, i) => (
        <Carousel.Item key={i}>
          <img src={img.src} alt={img.caption} />
          <Carousel.Caption>
            {renderCaption(img.caption, img.link)}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
