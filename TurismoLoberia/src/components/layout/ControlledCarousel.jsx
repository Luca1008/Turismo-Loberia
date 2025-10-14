import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import defaultArenas from "../../assets/images/carousel-index/default-arenas.jpg";
import defaultLoberia from "../../assets/images/carousel-index/default-loberia.jpg";
import defaultSanManuel from "../../assets/images/carousel-index/default-sanmanuel.jpg";
import { Global } from "../../helpers/Global";
import "../../styles/controlled-carousel.css";

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

/**
 * Componente `ControlledCarousel`
 *
 * Carousel controlado que muestra imágenes de diferentes ciudades con posibilidad
 * de obtener imágenes desde la API y fallback a imágenes por defecto.
 * Incluye autoplay cada 5 segundos y soporte para captions personalizados.
 *
 * @component
 *
 * @param {Object[]} [cities=defaultCities] - Lista de ciudades a mostrar en el carousel.
 * @param {string} cities[].key - Identificador único de la ciudad.
 * @param {string} cities[].caption - Texto a mostrar en el caption.
 * @param {string} cities[].defaultImg - Imagen por defecto si la API no devuelve imagen.
 * @param {string} cities[].link - Link de destino al hacer clic en el caption.
 * @param {Function} [renderCaption=(caption, link) => <h1><a href={link}>{caption}</a></h1>] 
 *        - Función para renderizar captions personalizados.
 *
 * @example
 * <ControlledCarousel
 *   cities={[
 *     { key: 'loberia', caption: 'Lobería', defaultImg: defaultLoberia, link: '/Loberia' }
 *   ]}
 * />
 *
 * @returns {JSX.Element} Carousel controlado con autoplay y captions interactivos.
 */
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

  /**
   * Carga las imágenes de cada ciudad desde la API o usa la imagen por defecto.
   */
  useEffect(() => {
    Promise.all(
      cities.map(async (city) => {
        try {
          const res = await fetch(`${Global.url}carousel/${city.key}`);
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

  /**
   * Actualiza el índice activo al seleccionar un slide.
   * @param {number} selectedIndex - Índice seleccionado
   */
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  /**
   * Avanza automáticamente el carousel cada 5 segundos
   */
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
