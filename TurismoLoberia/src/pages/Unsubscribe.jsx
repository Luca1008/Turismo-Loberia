import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/unsubscribe.css";
import { Global } from "../helpers/Global";

/**
 * Componente `Unsubscribe`.
 *
 * Permite a un usuario confirmar la desuscripción de una lista de correo
 * mediante un token recibido por URL. Muestra mensajes de estado y
 * controla la interacción durante el proceso.
 *
 * @component
 * @example
 * <Unsubscribe />
 *
 * @returns {JSX.Element} Sección de desuscripción con botón y mensajes de estado.
 */
export default function Unsubscribe() {
  /** Token de desuscripción recibido por la URL */
  const { token } = useParams();

  /** Mensaje que indica el estado actual del proceso */
  const [status, setStatus] = useState("Esperando confirmación...");

  /** Estado que indica si se está procesando la desuscripción */
  const [loading, setLoading] = useState(false);

  /** Estado que indica si la desuscripción fue exitosa */
  const [done, setDone] = useState(false);

  /**
   * Función que realiza la petición al backend para desuscribir al usuario.
   * Actualiza los estados `status`, `loading` y `done` según el resultado.
   */
  const handleUnsubscribe = async () => {
    setLoading(true);
    setStatus("Procesando tu desuscripción...");

    try {
      const res = await fetch(`${Global.url}send/unsubscribe/${token}`);
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
