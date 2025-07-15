import axios from 'axios';
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import WeatherCard from "../components/cards/WeatherCard";
import '../styles/weather.css';

export const Clima = () => {
  const ciudades = [
    { ciudad: "Lobería" },
    { ciudad: "San Manuel" },
    { ciudad: "Arenas Verdes", lat: -38.8083, lon: -58.6036 }
  ];

  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const promesas = ciudades.map(async (c) => {
        let url = c.lat && c.lon
          ? `http://localhost:5000/api/weather?lat=${c.lat}&lon=${c.lon}`
          : `http://localhost:5000/api/weather?city=${c.ciudad}`;
        try {
          const res = await axios.get(url);
          // Simular campos extra para la tabla (puedes adaptar según la respuesta real)
          return {
            ciudad: res.data.ciudad,
            temp: res.data.temp,
            sensacion: res.data.temp, // OpenWeather tiene main.feels_like si lo necesitas
            humedad: res.data.humedad || 80, // Ajusta si tu backend lo devuelve
            viento: res.data.viento !== undefined ? res.data.viento : "-", // Ajusta si tu backend lo devuelve
            presion: res.data.presion || 1012, // Ajusta si tu backend lo devuelve
            estado: res.data.descripcion
          };
        } catch {
          return {
            ciudad: c.ciudad,
            temp: '-',
            sensacion: '-',
            humedad: '-',
            viento: '-',
            presion: '-',
            estado: 'Sin datos'
          };
        }
      });
      const resultados = await Promise.all(promesas);
      setDetalles(resultados);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Obtener fecha actual en formato largo
  const diasLargos = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
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

  return (
    <div>
      <section>
        <h2>Consultá el clima</h2>
        <div className="section-weather">
          <WeatherCard ciudad="Lobería" />
          <WeatherCard ciudad="San Manuel" />
          <WeatherCard ciudad="Arenas Verdes" lat={-38.8083} lon={-58.6036} />
        </div>
        {/* Tabla de detalles */}
        <div style={{overflowX: 'auto', marginTop: '2rem', background: bgGradient, borderRadius: '16px', padding: '1.5rem 1rem'}}>
          <h3>Pronóstico detallado para el día de hoy: <span style={{fontWeight:400}}>{fechaCompleta}</span></h3>
          {loading ? (
            <div>Cargando datos...</div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ciudad</th>
                  <th>Temp. Actual</th>
                  <th>Sensación</th>
                  <th>Humedad</th>
                  <th>Viento</th>
                  <th>Presión</th>
                  <th>Estado</th>
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
      </section>
    </div>
  );
};

export default Clima;
