import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import "../../styles/panelAdmin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/subscriptions/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando estadísticas...</p>;

  const transportData = {
    labels: stats.transport.map(t => t.transporte),
    datasets: [
      {
        label: "Usuarios por transporte",
        data: stats.transport.map(t => t.count),
        backgroundColor: "rgba(54, 162, 235, 0.7)"
      }
    ]
  };

  const sourceData = {
    labels: stats.source.map(s => s.source_option),
    datasets: [
      {
        label: "Usuarios por fuente",
        data: stats.source.map(s => s.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ]
      }
    ]
  };

  const acceptData = {
    labels: ["Aceptaron", "No aceptaron"],
    datasets: [
      {
        data: stats.accept.map(a => a.count),
        backgroundColor: ["#28a745", "#dc3545"]
      }
    ]
  };

  const getPercentage = (count) => ((count / stats.total) * 100).toFixed(1);

  return (
    <div className="dashboard-container">
      <h2>Dashboard de Suscripciones</h2>

      {/* Total y Aceptación */}
      <div className="summary-cards">
        <div className="card-dashboard total">
          <h2>Total Suscripciones</h2>
          <h1>{stats.total}</h1>
        </div>

        <div className="card-dashboard accept">
          <h2>Aceptación</h2>
          <Pie className="pie-chart" data={acceptData} />
        </div>
      </div>

      {/* Transporte */}
      <div className="section">
        <h2>Transporte Elegido</h2>
        <div className="option-cards">
          {stats.transport.map((t, idx) => (
            <div key={idx} className="option-card transport">
              <h4>{t.transporte}</h4>
              <p>{t.count}</p>
              <small>{getPercentage(t.count)}%</small>
            </div>
          ))}
        </div>
        <Bar className="bar-chart-transport" data={transportData} options={{ responsive: true }} />
      </div>

      {/* Fuente */}
      <div className="section">
        <h2>Fuente de Contacto</h2>
        <div className="option-cards">
          {stats.source.map((s, idx) => (
            <div key={idx} className="option-card source">
              <h4>{s.source_option}</h4>
              <p>{s.count}</p>
              <small>{getPercentage(s.count)}%</small>
            </div>
          ))}
        </div>
        <Bar className="bar-chart-source" data={sourceData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
