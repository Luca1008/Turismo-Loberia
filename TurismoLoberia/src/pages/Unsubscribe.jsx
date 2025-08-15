import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/unsubscribe.css";

export default function Unsubscribe() {
  const { token } = useParams();
  const [status, setStatus] = useState("Esperando confirmación...");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleUnsubscribe = async () => {
    setLoading(true);
    setStatus("Procesando tu desuscripción...");

    try {
      const res = await fetch(`http://localhost:5000/api/send/unsubscribe/${token}`);
      const text = await res.text();

      if (res.ok) {
        setStatus(text);
        setDone(true);
      } else {
        setStatus(text || "Error al procesar la desuscripción.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error al procesar la desuscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="unsubscribe">
      <h2>{status}</h2>

      {!done && (
        <Button
          onClick={handleUnsubscribe}
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Procesando..." : "Confirmar desuscripción"}
        </Button>
      )}
    </section>
  );
}
