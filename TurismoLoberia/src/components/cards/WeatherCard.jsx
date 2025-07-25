import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBolt,
  FaCloud,
  FaCloudRain,
  FaMoon,
  FaSmog,
  FaSnowflake,
  FaSun,
} from "react-icons/fa";
import "../../styles/weather.css";

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const iconosOWMtoFa = {
  "01d": FaSun,
  "01n": FaMoon,
  "02d": FaCloud,
  "02n": FaCloud,
  "03d": FaCloud,
  "03n": FaCloud,
  "04d": FaCloud,
  "04n": FaCloud,
  "09d": FaCloudRain,
  "09n": FaCloudRain,
  "10d": FaCloudRain,
  "10n": FaCloudRain,
  "11d": FaBolt,
  "11n": FaBolt,
  "13d": FaSnowflake,
  "13n": FaSnowflake,
  "50d": FaSmog,
  "50n": FaSmog,
};
const obtenerClaseIcono = (codigoIcono) => {
  const clases = {
    "01d": "icono-sol",
    "01n": "icono-luna",
    "02d": "icono-nube",
    "02n": "icono-nube-noche",
    "03d": "icono-nube",
    "03n": "icono-nube-noche",
    "04d": "icono-nube",
    "04n": "icono-nube-noche",
    "09d": "icono-lluvia",
    "09n": "icono-lluvia-noche",
    "10d": "icono-lluvia",
    "10n": "icono-lluvia-noche",
    "11d": "icono-tormenta",
    "11n": "icono-tormenta-noche",
    "13d": "icono-nieve",
    "13n": "icono-nieve-noche",
    "50d": "icono-niebla",
    "50n": "icono-niebla-noche",
  };
  return clases[codigoIcono] || "icono-nube";
};

const diasLargos = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const hoy = new Date();
const fechaCompleta = `${diasLargos[hoy.getDay()]} ${hoy.getDate()} de ${
  meses[hoy.getMonth()]
} de ${hoy.getFullYear()}`;

const WeatherCard = ({ ciudad = "Tandil", lat, lon }) => {
  if (!ciudad && (lat === undefined || lon === undefined))
    return (
      <div style={{ color: "red" }}>
        Debes especificar una ciudad o coordenadas.
      </div>
    );
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState([]);

  useEffect(() => {
    let urlActual, urlPronostico;
    if (lat !== undefined && lon !== undefined) {
      urlActual = `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`;
      urlPronostico = `http://localhost:5000/api/forecast?lat=${lat}&lon=${lon}`;
    } else {
      urlActual = `http://localhost:5000/api/weather?city=${ciudad}`;
      urlPronostico = `http://localhost:5000/api/forecast?city=${ciudad}`;
    }
    axios
      .get(urlActual)
      .then((res) => setClimaActual(res.data))
      .catch(() => {
        // Si hay error, no seteamos nada y el spinner queda visible
      });

    axios
      .get(urlPronostico)
      .then((res) => {
        let datos = res.data;
        if (Array.isArray(datos) && datos.length && datos[0].dt_txt) {
          const dias = {};
          datos.forEach((item) => {
            const fechaUTC = new Date(item.dt_txt);
            const fechaLocal = new Date(
              fechaUTC.getTime() - 3 * 60 * 60 * 1000
            ); // UTC-3
            const dia = fechaLocal.toISOString().split("T")[0];
            if (!dias[dia]) dias[dia] = [];
            dias[dia].push(item);
          });
          const hoy = new Date().toISOString().split("T")[0];
          const diasKeys = Object.keys(dias)
            .filter((d) => d !== hoy)
            .sort()
            .slice(0, 5);
          datos = diasKeys.map((diaKey) => {
            const items = dias[diaKey];
            const tempMax = Math.max(...items.map((i) => i.main.temp_max));
            const tempMin = Math.min(...items.map((i) => i.main.temp_min));
            const horasDiurnas = items.filter((i) => {
              const h = (new Date(i.dt_txt).getUTCHours() - 3 + 24) % 24;
              return h >= 6 && h <= 18;
            });

            let iconoDia;
            if (horasDiurnas.length) {
              iconoDia = horasDiurnas.reduce((prev, curr) => {
                const hPrev =
                  (new Date(prev.dt_txt).getUTCHours() - 3 + 24) % 24;
                const hCurr =
                  (new Date(curr.dt_txt).getUTCHours() - 3 + 24) % 24;
                return Math.abs(hCurr - 12) < Math.abs(hPrev - 12)
                  ? curr
                  : prev;
              });
            } else {
              iconoDia = items.reduce((prev, curr) => {
                const hPrev =
                  (new Date(prev.dt_txt).getUTCHours() - 3 + 24) % 24;
                const hCurr =
                  (new Date(curr.dt_txt).getUTCHours() - 3 + 24) % 24;
                return Math.abs(hCurr - 12) < Math.abs(hPrev - 12)
                  ? curr
                  : prev;
              });
            }
            return {
              dt: iconoDia.dt,
              tempMax,
              tempMin,
              icon: iconoDia.weather[0].icon,
              descripcion: iconoDia.weather[0].description,
            };
          });
        }
        setPronostico(datos);
      })
      .catch(() => {
        // Si hay error, no seteamos nada y el spinner queda visible
      });
  }, [ciudad, lat, lon]); // <-- Agregado ciudad como dependencia

  if (!climaActual) return (
    <div className="weather-spinner-container">
      <div className="weather-spinner"></div>
    </div>
  );

  const IconoClima = iconosOWMtoFa[climaActual.icon] || FaCloud;

  return (
    <div className="card-weather">
      <h2 className="h2-weather">{ciudad || climaActual.ciudad}</h2>
      <div className="date-weather">{fechaCompleta}</div>
      <div className="container-weather">
        <IconoClima size={70} className={obtenerClaseIcono(climaActual.icon)} />
        <div className="actually-weather">{Math.round(climaActual.temp)}°</div>
        <div className="description-weather">{climaActual.descripcion}</div>
      </div>

      <div className="five-day-weather">
        {pronostico.slice(0, 5).map((dia, idx) => {
          const fechaUTC = new Date(dia.dt * 1000);
          const fechaLocal = new Date(fechaUTC.getTime() - 3 * 60 * 60 * 1000);
          const nombreDia = diasSemana[fechaLocal.getDay()];
          const IconoPronostico = iconosOWMtoFa[dia.icon] || FaCloud;
          return (
            <div key={idx} style={{ textAlign: "center", width: 56 }}>
              <div className="name-weather">{nombreDia}</div>
              <IconoPronostico
                className={`${obtenerClaseIcono(dia.icon)} icon-weather`}
              />
              <div className="temp-max-weather">{Math.round(dia.tempMax)}°</div>
              <div className="temp-min-weather">{Math.round(dia.tempMin)}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherCard;
