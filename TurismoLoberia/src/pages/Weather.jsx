import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  FaCity,
  FaCloudSun,
  FaSun,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTint,
  FaWind,
} from "react-icons/fa";
import WeatherCard from "../components/cards/WeatherCard";
import "../styles/weather.css";
import ButtonSubmit from "../components/common/ButtonSubmit";

export const Clima = () => {
  const ciudades = [
    { ciudad: "Lobería" },
    { ciudad: "San Manuel" },
    { ciudad: "Arenas Verdes", lat: -38.8083, lon: -58.6036 },
  ];

  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para pronóstico extendido
  const [forecastLoberia, setForecastLoberia] = useState([]);
  const [forecastSanManuel, setForecastSanManuel] = useState([]);
  const [forecastArenasVerdes, setForecastArenasVerdes] = useState([]);
  const [loadingForecast, setLoadingForecast] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promesas = ciudades.map(async (c) => {
          let url = c.lat && c.lon
            ? `http://localhost:5000/api/weather?lat=${c.lat}&lon=${c.lon}`
            : `http://localhost:5000/api/weather?city=${c.ciudad}`;
          try {
            const res = await axios.get(url);
            return {
              ciudad: res.data.ciudad,
              temp: res.data.temp,
              sensacion: res.data.temp,
              humedad: res.data.humedad || 80,
              viento: res.data.viento !== undefined ? res.data.viento : "-",
              presion: res.data.presion || 1012,
              estado: res.data.descripcion,
            };
          } catch {
            return {
              ciudad: c.ciudad,
              temp: '-',
              sensacion: '-',
              humedad: '-',
              viento: '-',
              presion: '-',
              estado: 'Sin datos',
            };
          }
        });
        const resultados = await Promise.all(promesas);
        setDetalles(resultados);
        setLoading(false); // Solo si todo sale bien
      } catch {
        // Si hay error general, no cambiamos loading
      }
    };
    fetchData();
  }, []);

  // Obtener pronóstico extendido para cada ciudad
  useEffect(() => {
    const fetchForecasts = async () => {
      setLoadingForecast(true);
      try {
        // Lobería
        const resLob = await axios.get(
          `http://localhost:5000/api/forecast?city=Lobería`
        );
        setForecastLoberia(resLob.data);
        // San Manuel
        const resSan = await axios.get(
          `http://localhost:5000/api/forecast?city=San Manuel`
        );
        setForecastSanManuel(resSan.data);
        // Arenas Verdes
        const resArenas = await axios.get(
          `http://localhost:5000/api/forecast?lat=-38.8083&lon=-58.6036`
        );
        setForecastArenasVerdes(resArenas.data);
        setLoadingForecast(false); // Solo si todo sale bien
      } catch (error) {
        // Si hay error, no cambiamos loadingForecast
      }
    };
    fetchForecasts();
  }, []);

  // Obtener fecha actual en formato largo
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
  const fechaCompleta = `${diasLargos[hoy.getDay()]} ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;

  // Determinar degradado según el estado del clima de la primera ciudad
  let bgGradient = "linear-gradient(to bottom, #ffffff, #ffffff)";
  const estado = detalles[0]?.estado?.toLowerCase() || "";
  if (estado.includes("lluvia")) {
    bgGradient = "linear-gradient(to bottom, #a3c9e2, #ffffff)";
  } else if (estado.includes("nube")) {
    bgGradient = "linear-gradient(to bottom, #d6dbe0, #ffffff)";
  } else if (estado.includes("sol") || estado.includes("despejado")) {
    bgGradient = "linear-gradient(to bottom, #fff5cc, #ffffff)";
  } else if (estado.includes("tormenta")) {
    bgGradient = "linear-gradient(to bottom, #b0bec5, #ffffff)";
  } else if (estado.includes("niebla")) {
    bgGradient = "linear-gradient(to bottom, #e0f7fa, #ffffff)";
  }

  // Función para formatear fecha desde timestamp
  const formatFecha = (dt) => {
    const fecha = new Date(dt * 1000);
    return `${diasLargos[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]}`;
  };

  // Cabecera de tabla con íconos
  const TableHeader = () => (
    <thead>
      <tr>
        <th>
          Fecha
        </th>
        <th>
          Temp. Máx <FaTemperatureHigh style={{ marginLeft: 4, color: '#ff9800' }} />
        </th>
        <th>
          Temp. Mín <FaTemperatureLow style={{ marginLeft: 4, color: '#2196f3' }} />
        </th>
        <th>
          Estado <FaCloudSun style={{ marginLeft: 4, color: '#ffc107' }} />
        </th>
      </tr>
    </thead>
  );

  // Función para obtener el ícono del pronóstico
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return <FaCloudSun />;
      case "02d":
      case "02n":
        return <FaCloudSun />;
      case "03d":
      case "03n":
        return <FaCloudSun />;
      case "04d":
      case "04n":
        return <FaCloudSun />;
      case "09d":
      case "09n":
        return <FaTint />;
      case "10d":
      case "10n":
        return <FaTint />;
      case "11d":
      case "11n":
        return <FaWind />;
      case "13d":
      case "13n":
        return <FaTemperatureLow />;
      case "50d":
      case "50n":
        return <FaTint />;
      default:
        return <FaCloudSun />;
    }
  };

  return (
    <div>
      <section className='weather'>
        <h1>Consultá el Clima</h1>
        <div className="section-weather">
          <WeatherCard ciudad="Lobería" />
          <WeatherCard ciudad="San Manuel" />
          <WeatherCard ciudad="Arenas Verdes" lat={-38.8083} lon={-58.6036} />
        </div>
        {/* Tabla de detalles */}
        <div className='table-weather' style={{ background: bgGradient }}>
          <h3>Pronóstico detallado para el día de hoy: <span style={{ fontWeight: 400 }}>{fechaCompleta}</span></h3>
          {loading ? (
            <div class="weather-spinner-container">
              <div class="weather-spinner"></div>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    Ciudad <FaCity style={{ marginLeft: 4, color: '#4caf50' }} />
                  </th>
                  <th>
                    Temp. Actual <FaTemperatureHigh style={{ marginLeft: 4, color: '#ff9800' }} />
                  </th>
                  <th>
                    Sensación <FaTemperatureLow style={{ marginLeft: 4, color: '#2196f3' }} />
                  </th>
                  <th>
                    Humedad <FaTint style={{ marginLeft: 4, color: '#00bcd4' }} />
                  </th>
                  <th>
                    Viento <FaWind style={{ marginLeft: 4, color: '#90a4ae' }} />
                  </th>
                  <th>
                    Presión <FaTachometerAlt style={{ marginLeft: 4, color: '#9c27b0' }} />
                  </th>
                  <th>
                    Estado <FaCloudSun style={{ marginLeft: 4, color: '#ffc107' }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.ciudad}</td>
                    <td>{d.temp !== '-' ? Math.round(d.temp) + '°' : '-'}</td>
                    <td>{d.sensacion !== '-' ? Math.round(d.sensacion) + '°' : '-'}</td>
                    <td>{d.humedad}%</td>
                    <td>{d.viento}</td>
                    <td>{d.presion} hPa</td>
                    <td>{d.estado}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        {/* Tablas de pronóstico extendido: una por ciudad, cada una con los cinco días como filas */}
        <h2 className="h2-weather">Pronóstico Extendido</h2>
        <div className="section-weather" style={{ flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
          {loadingForecast ? (
            <div className="weather-spinner-container">
            <div className="weather-spinner"></div>
          </div>
          ) : (
            <>
              {/* Lobería */}
              <div className='table-weather'>
                <h3>Lobería</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Temp. Máx <FaTemperatureHigh style={{ marginLeft: 4, color: '#ff9800' }} /></th>
                      <th>Temp. Mín <FaTemperatureLow style={{ marginLeft: 4, color: '#2196f3' }} /></th>
                      <th>Estado <FaCloudSun style={{ marginLeft: 4, color: '#ffc107' }} /></th>
                      <th>Humedad <FaTint style={{ marginLeft: 4, color: '#00bcd4' }} /></th>
                      <th>Viento <FaWind style={{ marginLeft: 4, color: '#90a4ae' }} /></th>
                      <th>Presión <FaTachometerAlt style={{ marginLeft: 4, color: '#9c27b0' }} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecastLoberia.map((d, i) => (
                      <tr key={i}>
                        <td>{formatFecha(d.dt)}</td>
                        <td>{Math.round(d.tempMax)}°</td>
                        <td>{Math.round(d.tempMin)}°</td>
                        <td style={{ textTransform: 'capitalize' }}>{d.descripcion}</td>
                        <td>{d.humedad ? d.humedad + '%' : '-'}</td>
                        <td>{d.viento ? d.viento + ' km/h' : '-'}</td>
                        <td>{d.presion ? d.presion + ' hPa' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* San Manuel */}
              <div className='table-weather'>
                <h3>San Manuel</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Temp. Máx <FaTemperatureHigh style={{ marginLeft: 4, color: '#ff9800' }} /></th>
                      <th>Temp. Mín <FaTemperatureLow style={{ marginLeft: 4, color: '#2196f3' }} /></th>
                      <th>Estado <FaCloudSun style={{ marginLeft: 4, color: '#ffc107' }} /></th>
                      <th>Humedad <FaTint style={{ marginLeft: 4, color: '#00bcd4' }} /></th>
                      <th>Viento <FaWind style={{ marginLeft: 4, color: '#90a4ae' }} /></th>
                      <th>Presión <FaTachometerAlt style={{ marginLeft: 4, color: '#9c27b0' }} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecastSanManuel.map((d, i) => (
                      <tr key={i}>
                        <td>{formatFecha(d.dt)}</td>
                        <td>{Math.round(d.tempMax)}°</td>
                        <td>{Math.round(d.tempMin)}°</td>
                        <td style={{ textTransform: 'capitalize' }}>{d.descripcion}</td>
                        <td>{d.humedad ? d.humedad + '%' : '-'}</td>
                        <td>{d.viento ? d.viento + ' km/h' : '-'}</td>
                        <td>{d.presion ? d.presion + ' hPa' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* Arenas Verdes */}
              <div className='table-weather'>
                <h3>Arenas Verdes</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Temp. Máx <FaTemperatureHigh style={{ marginLeft: 4, color: '#ff9800' }} /></th>
                      <th>Temp. Mín <FaTemperatureLow style={{ marginLeft: 4, color: '#2196f3' }} /></th>
                      <th>Estado <FaCloudSun style={{ marginLeft: 4, color: '#ffc107' }} /></th>
                      <th>Humedad <FaTint style={{ marginLeft: 4, color: '#00bcd4' }} /></th>
                      <th>Viento <FaWind style={{ marginLeft: 4, color: '#90a4ae' }} /></th>
                      <th>Presión <FaTachometerAlt style={{ marginLeft: 4, color: '#9c27b0' }} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecastArenasVerdes.map((d, i) => (
                      <tr key={i}>
                        <td>{formatFecha(d.dt)}</td>
                        <td>{Math.round(d.tempMax)}°</td>
                        <td>{Math.round(d.tempMin)}°</td>
                        <td style={{ textTransform: 'capitalize' }}>{d.descripcion}</td>
                        <td>{d.humedad ? d.humedad + '%' : '-'}</td>
                        <td>{d.viento ? d.viento + ' km/h' : '-'}</td>
                        <td>{d.presion ? d.presion + ' hPa' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Clima;
