import React from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaBicycle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export const SanManuel = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("san_manuel")}</h1>
      <div className="portada-city"></div>
      <section className="information">
        <p>
          San Manuel es una localidad del partido de Lobería, en el sur de la provincia de Buenos Aires, Argentina.
        </p>
        <p>
          Su origen se remonta a una pulpería fundada por Manuel Villar en 1870, ubicada a unos 7 km del actual emplazamiento.
        </p>
        <p>
          En 1928, frente a la estación ferroviaria en construcción, se estableció un almacén que dio origen al pueblo. La estación se inauguró el 25 de marzo de 1929, y en 1943 se oficializó el nombre de San Manuel por decreto provincial.
        </p>
        <p>
          Actualmente, San Manuel cuenta con aproximadamente 1.130 habitantes y se destaca por su entorno natural y su rica historia.
        </p>
        <p>
          Entre sus principales atractivos se encuentran el cerro San Luis, el calvario en el cerro El Toro, la cueva de los Barrientos y la Fiesta Patronal de Nuestra Señora de Fátima.
        </p>
        <p>
          Además, alberga instituciones educativas, culturales y de salud que fortalecen la identidad local.
        </p>
      </section>
      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p>
          <strong><FaCar />En auto:</strong> Ruta recomendada: Tomá la Ruta Nacional 226 desde Tandil en dirección a Lobería.
        </p>
        <p>
          <strong>Distancia aproximada:</strong> 79 km. <strong>Tiempo estimado:</strong> Alrededor de 1 hora y 15 minutos, dependiendo del tráfico y las condiciones del camino.
        </p>
        <p>
          <strong><FaBus />En colectivo:</strong> No se dispone de información actualizada sobre servicios directos de colectivo desde Tandil a San Manuel.
        </p>
        <p>
          Una opción es viajar en colectivo desde Tandil a Lobería y luego tomar un transporte local o taxi hasta San Manuel.
        </p>
        <p>
          Es recomendable consultar con las empresas de transporte interurbano o con la terminal de Tandil para obtener información actualizada sobre horarios y conexiones.
        </p>
        <p>
          <strong><FaBicycle />En bicicleta:</strong> Si te interesa el cicloturismo, podés recorrer la ruta entre Tandil y San Manuel.
        </p>
        <p>
          La ruta está en buen estado en su mayoría, pero presenta algunas lomas que pueden hacer el trayecto exigente. El paisaje es pintoresco, ideal para quienes disfrutan de la naturaleza y el ejercicio al aire libre.
        </p>
        <div className="photo"></div>
      </section>
      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>
          San Manuel ofrece opciones de alojamiento sencillas y acogedoras, ideales para quienes buscan una experiencia tranquila en el campo.
        </p>
        <p>
          Una de las principales alternativas es el Hotel de la Cooperativa Eléctrica San Manuel, que brinda hospedaje básico con servicios esenciales.
        </p>
        <p>
          Además, la Estancia Don Manuel, ubicada en Cañuelas, ofrece una experiencia más completa con actividades de polo, eventos sociales y empresariales, y alojamiento en un entorno rural de calidad.
        </p>
        <ButtonSuccess />
      </section>
      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo"></div>
        <p>
          San Manuel ofrece una propuesta gastronómica sencilla y auténtica, ideal para quienes buscan disfrutar de la cocina casera en un entorno rural.
        </p>
        <p>
          Aunque no cuenta con una amplia variedad de restaurantes, sus opciones reflejan la tradición culinaria de la región.
        </p>
        <p>
          En las cercanías, en la ciudad de Tandil, se pueden encontrar panaderías y confiterías que ofrecen productos típicos como bizcochos, cremonas, facturas y tortas artesanales, ideales para acompañar el mate o disfrutar de un desayuno o merienda.
        </p>
        <p>
          Estas delicias locales son perfectas para llevar o disfrutar en el lugar.
        </p>
        <p>
          Si bien San Manuel es una localidad pequeña, su gastronomía refleja el espíritu de la vida rural argentina, donde la comida casera y los sabores tradicionales son los protagonistas.
        </p>
        <ButtonSuccess />
      </section>
      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo"></div>
        <p>
          San Manuel, una localidad del partido de Lobería en la provincia de Buenos Aires, ofrece opciones limitadas de transporte público.
        </p>
        <p>
          La estación ferroviaria de San Manuel pertenece al ramal del Ferrocarril General Roca que conecta Tandil con Lobería; sin embargo, actualmente no presta servicios de pasajeros.
        </p>
        <p>
          Para acceder a San Manuel desde otras localidades, como Tandil o Lobería, es recomendable utilizar el transporte interurbano.
        </p>
        <p>
          Por ejemplo, desde Tandil se puede tomar un colectivo hasta Lobería y, desde allí, utilizar un servicio de transporte local o taxi hasta San Manuel.
        </p>
        <p>
          En ocasiones especiales, como los festejos del aniversario de Lobería, la Municipalidad ha dispuesto transporte desde San Manuel para facilitar la participación de los vecinos en los eventos.
        </p>
      </section>
      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>
          San Manuel, una localidad del partido de Lobería, Buenos Aires, celebra diversos eventos a lo largo del año, destacándose especialmente durante el mes de marzo.
        </p>
        <p>
          Entre los eventos más destacados se encuentran:
        </p>
        <p>
          <strong>Carnavales:</strong> San Manuel participa activamente en los festejos de carnaval, con actividades programadas para el 22 de febrero. Estos eventos incluyen desfiles, música y danzas, reflejando la rica tradición cultural de la región.
        </p>
        <p>
          <strong>Aniversario de San Manuel:</strong> Cada 25 de marzo, la localidad celebra su aniversario con una serie de actividades que incluyen carreras, desfiles y presentaciones artísticas.
        </p>
        <p>
          Por ejemplo, en 2024, se llevó a cabo una carrera aniversario organizada por la Asociación Atlética y Deportiva San Manuel, con el apoyo del Gobierno Local.
        </p>
        <ButtonSuccess />
      </section>
      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p>
          En San Manuel, podés disfrutar de varias actividades al aire libre y culturales que reflejan el encanto de esta localidad serrana.
        </p>
        <p>
          <strong>Visitar el Cerro San Luis y el Cerro El Toro:</strong> ideales para hacer trekking, caminatas y disfrutar de vistas panorámicas increíbles del paisaje natural.
        </p>
        <p>
          <strong>Explorar la Cueva de los Barrientos:</strong> una cueva histórica y geológica con túneles interesantes para recorrer, famosa por su leyenda local.
        </p>
        <p>
          <strong>Participar en eventos locales:</strong> como los carnavales o el aniversario de San Manuel, con actividades culturales, música y deportes.
        </p>
        <p>
          <strong>Disfrutar de la tranquilidad rural:</strong> recorrer el pueblo, conocer la vida cotidiana, y probar la gastronomía casera típica de la zona.
        </p>
        <p>
          <strong>Ecoturismo y observación de flora y fauna:</strong> gracias a su entorno serrano y natural, es un lugar ideal para amantes de la naturaleza y la fotografía.
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
