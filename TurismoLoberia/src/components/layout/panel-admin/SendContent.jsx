import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../../styles/panelAdmin.css';
import { Global } from "../../../helpers/Global";

export default function SendContent() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false); // Estado de envío

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); // Inicio de envío
    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("message", message);
      if (file) formData.append("file", file);

      const res = await fetch(`${Global.url}send/send`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Contenido enviado correctamente!");
        setSubject("");
        setMessage("");
        setFile(null);
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
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
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
