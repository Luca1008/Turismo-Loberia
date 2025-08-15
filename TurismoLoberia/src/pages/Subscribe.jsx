import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { FaAsterisk } from "react-icons/fa";
import { trackEvent } from "../analytics"; // GA4
import ButtonSubmit from "../components/common/ButtonSubmit";
import { Global } from "../helpers/Global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Suscribe = () => {
  const [formData, setFormData] = useState({
    direction: "",
    think: "",
    project: "",
    name: "",
    email: "",
    phone: "",
    companions: [],
    transport: [],
    source: [],
    accept: false,
  });
  const [status, setStatus] = useState(""); // 'enviando', 'exitoso', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackEvent("page_view", {
      category: "Páginas",
      label: "Formulario Suscripción",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "companions") {
      const updated = checked
        ? [...formData.companions, value]
        : formData.companions.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, companions: updated }));
      trackEvent("checkbox_marcado", { category: "Formulario", label: `Compañía: ${value}` });
      return;
    }

    if (type === "checkbox" && name === "accept") {
      setFormData((prev) => ({ ...prev, accept: checked }));
      trackEvent("checkbox_marcado", { category: "Formulario", label: "Acepta políticas" });
      return;
    }

    if (name === "source") {
      const updated = checked
        ? [...formData.source, value]
        : formData.source.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, source: updated }));
      trackEvent("checkbox_marcado", { category: "Formulario", label: `Origen: ${value}` });
      return;
    }

    if (name === "transport") {
      const updated = checked
        ? [...formData.transport, value]
        : formData.transport.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, transport: updated }));
      trackEvent("checkbox_marcado", { category: "Formulario", label: `Transporte: ${value}` });
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    trackEvent("campo_completado", { category: "Formulario", label: name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("enviando");
    setErrorMessage("");

    try {
      const res = await fetch(Global.url + "subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Error en la suscripción");
        toast.error(data.message || "Error en la suscripción");
      } else {
        setStatus("exitoso");
        setErrorMessage(data.message); // mensaje dinámico del backend
        toast.success(data.message);

        setFormData({
          direction: "",
          think: "",
          project: "",
          name: "",
          email: "",
          phone: "",
          companions: [],
          transport: [],
          source: [],
          accept: false,
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Error al conectarse con el servidor");
      toast.error("Error al conectarse con el servidor");
    }
  };

  return (
    <div>
      <section className="suscribe" key={i18n.language}>
        <h2>{t("suscribete_titulo")}</h2>
        <Form className="form-direction" onSubmit={handleSubmit}>
          <Form.Group controlId="direction" className="mb-3">
            <Form.Label>
              {t("vivo_en")}
              <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={t("ciudad_provincia_pais")}
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="source" className="mb-3">
            <Form.Label>
              {t("me_entere")}
              <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              {[
                "Conocidos",
                "Radio",
                "Televisión",
                "Redes Sociales",
                "Nunca escuché",
              ].map((item) => (
                <Form.Check
                  key={item}
                  label={item}
                  type="checkbox"
                  name="source"
                  value={item}
                  checked={formData.source.includes(item)}
                  onChange={handleChange}
                  className="mb-1"
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="think" className="mb-3">
            <Form.Label>{t("pienso_en_loberia")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("placeholder_palabra")}
              name="think"
              value={formData.think}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="project" className="mb-3">
            <Form.Label>{t("Cuando_vaya_a_Lobería_quiero")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("placeholder_palabra")}
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="companions" className="mb-3">
            <Form.Label>
              {t("Me_gustaría_ir")}
              <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              {[
                "Sólo/a",
                "En pareja",
                "Con familia",
                "Con amigos",
                "Con mis mascotas",
              ].map((item) => (
                <Form.Check
                  key={item}
                  label={t(item)}
                  type="checkbox"
                  name="companions"
                  value={t(item)}
                  checked={formData.companions.includes(item)}
                  onChange={handleChange}
                  className="mb-1"
                  required={formData.companions.length === 0}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="transport" className="mb-3">
            <Form.Label>{t("iria_en")}</Form.Label>
            <div>
              {[
                "Micro_de_larga_distancia",
                "Vehículo_propio",
                "Viajes_compartidos",
                "Motorhome",
                "Tour_de_Agencia_de_viajes",
                "Otros",
              ].map((item) => (
                <Form.Check
                  key={item}
                  label={t(item)}
                  type="checkbox"
                  name="transport"
                  value={t(item)}
                  checked={formData.transport.includes(item)}
                  onChange={handleChange}
                  className="mb-1"
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="name" className="mb-3">
            <Form.Label>
              {t("nombre_apellido2")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Juan Pérez"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>
              {t("Mi_correo_electrónico_es")}
              <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@dominio.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>
              {t("Mi_teléfono_WhatsApp_es")}
              <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="+54 9 1234 5678"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="accept" className="mb-3">
            <Form.Check
              type="checkbox"
              label={
                <>
                  {t("Acepto_politicas")}{" "}
                  <a
                    href="/politicas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("")}
                  </a>
                  .
                </>
              }
              name="accept"
              checked={formData.accept}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <p className="required-info">
            {t("campos_obligatorios")}
            <FaAsterisk className="requerided" />
            {t("son_obligatorios")}
          </p>
          <ButtonSubmit
            text={status === "enviando" ? t("enviando") : t("enviar")}
            disabled={status === "enviando"}
            className={`btn-success${status === "enviando" ? " sending" : ""}`}
          />

          {/* Mensajes */}
          {status === "exitoso" && (
            <p className="success-message">{errorMessage || t("mensaje_enviado")}</p>
          )}
          {status === "error" && <p className="error-message">{errorMessage}</p>}
        </Form>

        {/* Toast container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </div>
  );
};

export default Suscribe;