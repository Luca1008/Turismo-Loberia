import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/panelAdmin.css";
import { Global } from "../../../helpers/Global";

/**
 * Componente `SendContent`
 *
 * Permite enviar contenido (asunto, mensaje y archivo opcional)
 * a los suscriptores del sistema mediante un formulario.
 * Muestra notificaciones de éxito o error usando `react-toastify`.
 *
 * @component
 *
 * @example
 * <SendContent />
 *
 * @returns {JSX.Element} Formulario de envío de contenido.
 */
export default function SendContent() {
  const [subject, setSubject] = useState(""); // Asunto del mensaje
  const [message, setMessage] = useState(""); // Contenido del mensaje
  const [file, setFile] = useState(null); // Archivo opcional
  const [sending, setSending] = useState(false); // Estado de envío

  /**
   * Envía el contenido al backend.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
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
      setSending(false);
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
