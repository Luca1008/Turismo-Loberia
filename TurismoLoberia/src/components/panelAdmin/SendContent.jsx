import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../styles/panelAdmin.css';

export default function SendContent() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false); // Nuevo estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); // Inicio de envío
    try {
      const res = await fetch("http://localhost:5000/api/send/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Contenido enviado correctamente!");
        setSubject("");
        setMessage("");
      } else {
        toast.error(data.message || "Error enviando contenido");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error enviando contenido");
    } finally {
      setSending(false); // Fin de envío
    }
  };

  return (
    <div className="send-content-container">
      <h2>Enviar contenido a suscriptores</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Asunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {/* Contenedor de los toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
