import React from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const Loberia = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("ciudad_loberia")}</h1>
      <div className="portada-city"></div>
      <section className="information">
        <p>
          Lobería es una ciudad ubicada en el sudeste de la provincia de Buenos Aires, Argentina. Es la cabecera del partido homónimo y se destaca por su tranquilidad, su entorno natural y su rica historia.
        </p>
        <p>
          Rodeada de campos productivos y atravesada por arroyos, Lobería combina el encanto de un pueblo con servicios urbanos, una arquitectura pintoresca y una comunidad hospitalaria.
        </p>
        <p>
          Su ubicación estratégica y su cercanía a destinos turísticos como Necochea y Arenas Verdes la convierten en un punto ideal para quienes buscan naturaleza, cultura y tradición rural.
        </p>
      </section>
      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p>
          Lobería se encuentra a aproximadamente 470 km de la Ciudad Autónoma de Buenos Aires, en el sudeste de la provincia de Buenos Aires.
        </p>
        <p>
          <strong><FaCar />En auto:</strong> Desde Buenos Aires, tomar la Autopista Buenos Aires–La Plata y luego la Ruta Provincial 2 hasta Mar del Plata. Desde allí, continuar por la Ruta 88 hasta llegar al empalme con la Ruta Provincial 227, que lleva directamente a Lobería.
        </p>
        <p>
          <strong><FaBus />En micro:</strong> Varias empresas de ómnibus brindan servicios regulares desde Buenos Aires, Mar del Plata, Tandil, Necochea y otras ciudades de la región. El arribo es en la terminal local, ubicada cerca del centro.
        </p>
        <p>
          <strong><FaTrain /><FaBus />En tren + micro:</strong> Otra opción es tomar el tren hasta Tandil (desde Plaza Constitución) y luego conectar con un servicio de colectivo hasta Lobería.
        </p>
        <p>
          Lobería también está ubicada a 130 km de Mar del Plata, 50 km de Necochea, y a unos 100 km de Tandil, lo que facilita el acceso desde distintos puntos turísticos de la provincia.
        </p>
        <div className="photo"></div>
      </section>
      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>
          La ciudad de Lobería ofrece una variedad de opciones de alojamiento pensadas para todo tipo de visitantes.
        </p>
        <p>
          Se pueden encontrar hoteles familiares, hosterías, cabañas, departamentos temporarios y casas de alquiler totalmente equipadas.
        </p>
        <p>
          La mayoría de los hospedajes están ubicados en zonas céntricas, cercanas a comercios, restaurantes y espacios públicos. También hay alojamientos rurales en las afueras, ideales para quienes buscan tranquilidad y contacto con la naturaleza.
        </p>
        <p>
          Durante la temporada alta y fines de semana largos, se recomienda reservar con anticipación, ya que la demanda suele aumentar considerablemente.
        </p>
        <ButtonSuccess />
      </section>
      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo"></div>
        <p>
          La gastronomía en Lobería se destaca por su sencillez y sabor casero, con propuestas que combinan tradición rural y productos frescos de la zona.
        </p>
        <p>
          En el centro de la ciudad y sus alrededores se pueden encontrar restaurantes, parrillas, pizzerías, cafeterías y casas de comidas que ofrecen desde platos típicos argentinos hasta opciones vegetarianas y menú para celíacos.
        </p>
        <p>
          Los fines de semana, es común encontrar ferias gastronómicas, food trucks y puestos de artesanos donde probar dulces regionales, empanadas, carnes al asador y más.
        </p>
        <p>
          Lobería es ideal para disfrutar de una comida abundante y de calidad en un ambiente familiar.
        </p>
        <ButtonSuccess />
      </section>
      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo"></div>
        <p>
          Lobería cuenta con una terminal de ómnibus que conecta la ciudad con destinos regionales como Necochea, Mar del Plata, Tandil, Balcarce y la Ciudad de Buenos Aires.
        </p>
        <p>
          Varias empresas de transporte de larga y media distancia operan en la zona, facilitando el acceso desde distintos puntos del país.
        </p>
        <p>
          Dentro del partido, hay servicios de remís y taxis, especialmente activos en el casco urbano.
        </p>
        <p>
          Durante eventos o temporadas turísticas, también suelen habilitarse traslados especiales a localidades cercanas como San Manuel o Arenas Verdes.
        </p>
        <p>
          Si se viaja en vehículo propio, Lobería está bien conectada por rutas provinciales como la RP 227, que facilita el acceso desde la Ruta Nacional 3 o la Ruta Provincial 88.
        </p>
      </section>
      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>
          Lobería ofrece una variada agenda cultural y recreativa a lo largo del año.
        </p>
        <p>
          Se destacan eventos como la Fiesta Provincial de las Tropillas Entabladas, festivales de música, muestras de arte, encuentros gastronómicos y ferias artesanales.
        </p>
        <p>
          Durante los fines de semana largos y la temporada de verano, se organizan actividades al aire libre, espectáculos en plazas, y propuestas para toda la familia.
        </p>
        <p>
          La Municipalidad de Lobería y diversas instituciones locales difunden la programación actualizada a través de redes sociales y la oficina de turismo.
        </p>
        <ButtonSuccess />
      </section>
      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p>
          <strong>Playas y naturaleza:</strong> Visitar Arenas Verdes y Bahía de los Moros para disfrutar del mar y paisajes costeros. También hacer caminatas o bici por el Camino de Sirga junto al río Quequén.
        </p>
        <p>
          <strong>Cultura e historia:</strong> Recorrer el Museo de Ciencias Naturales y el Museo Histórico de la ciudad para conocer su pasado.
        </p>
        <p>
          <strong>Turismo rural:</strong> Explorar las localidades de San Manuel y Las Toscas, con opciones de trekking, cabalgatas y turismo rural.
        </p>
        <p>
          <strong>Gastronomía y relax:</strong> Disfrutar de la Plaza Mitre, cafés y restaurantes con platos típicos de la región.
        </p>
      </section>
      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>
          Puedes descargar material útil para tu visita como: Mapa turístico, listado actualizado de alojamientos y guía gastronómica local.
        </p>
      </section>
    </div>
  );
};

export default Loberia;
