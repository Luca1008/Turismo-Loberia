import axios from "axios";
import { useEffect, useState } from "react";
import { FaBolt, FaCloud, FaCloudRain, FaMoon, FaSmog, FaSnowflake, FaSun } from "react-icons/fa";
import '../../styles/wheather.css';

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

const diasLargos = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const hoy = new Date();
const fechaCompleta = `${diasLargos[hoy.getDay()]} ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;

const WheatherCard = ({ ciudad = "Tandil", lat, lon }) => {
  if (!ciudad && (lat === undefined || lon === undefined)) return <div style={{ color: "red" }}>Debes especificar una ciudad o coordenadas.</div>;
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState([]);
  const [error, setError] = useState(null);

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
      .catch(() => setError("No hay datos del clima actual."));

    axios
      .get(urlPronostico)
      .then((res) => {
        // Si la API ya devuelve un array de días con tempMax/tempMin, icon y descripcion, úsalo directo
        // Si no, agrupa los datos por día y calcula máximas y mínimas
        let datos = res.data;
        //console.log('Pronóstico crudo:', datos); // <-- Agregado para depuración
        if (Array.isArray(datos) && datos.length && datos[0].dt_txt) {
          // Agrupar por día
          const dias = {};
          datos.forEach(item => {
            const fecha = new Date(item.dt_txt);
            const dia = fecha.toISOString().split('T')[0];
            if (!dias[dia]) dias[dia] = [];
            dias[dia].push(item);
          });
          // Tomar los próximos 5 días (sin incluir hoy)
          const hoy = new Date().toISOString().split('T')[0];
          const diasKeys = Object.keys(dias)
            .filter(d => d !== hoy)
            .sort() // Ordena por fecha ascendente
            .slice(0, 5);
          datos = diasKeys.map(diaKey => {
            const items = dias[diaKey];
            const tempMax = Math.max(...items.map(i => i.main.temp_max));
            const tempMin = Math.min(...items.map(i => i.main.temp_min));
            const mediodia = items.find(i => new Date(i.dt_txt).getHours() === 12) || items[0];
            return {
              dt: mediodia.dt,
              tempMax,
              tempMin,
              icon: mediodia.weather[0].icon,
              descripcion: mediodia.weather[0].description,
            };
          });
        }
        setPronostico(datos);
      })
      .catch(() => setError("No hay pronóstico disponible."));
  }, [ciudad, lat, lon]); // <-- Agregado ciudad como dependencia

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!climaActual) return <div>Cargando...</div>;

  const IconoClima = iconosOWMtoFa[climaActual.icon] || FaCloud;

  return (
    <div
      className="card-weather"
    >
      <h2 style={{ fontWeight: "bold", fontSize: "2.2rem", textAlign: "center" }}>
        {ciudad || climaActual.ciudad}
      </h2>
      <div style={{ textAlign: "center", color: "#888", fontSize: "1.1rem", marginBottom: 8 }}>
        {fechaCompleta}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 12 }}>
        <IconoClima size={70} color="#f9d71c" />
        <div style={{ fontWeight: "bold", fontSize: "2.8rem", marginTop: 8 }}>
          {Math.round(climaActual.temp)}°
        </div>
        <div style={{ fontSize: "1rem", textTransform: "capitalize" }}>{climaActual.descripcion}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        {pronostico.slice(0, 5).map((dia, idx) => {
          const fecha = new Date(dia.dt * 1000);
          const nombreDia = diasSemana[fecha.getDay()];
          const IconoPronostico = iconosOWMtoFa[dia.icon] || FaCloud;
          return (
            <div key={idx} style={{ textAlign: "center", width: 56 }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 2 }}>{nombreDia}</div>
              <IconoPronostico size={36} color="#f9d71c" />
              <div style={{ fontSize: "1.1rem", marginTop: 2 }}>{Math.round(dia.tempMax)}°</div>
              <div style={{ fontSize: "0.95rem", color: "#888" }}>{Math.round(dia.tempMin)}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WheatherCard;
