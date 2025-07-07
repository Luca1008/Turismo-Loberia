import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { FaAsterisk } from "react-icons/fa";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import Breadcrumb from "../components/common/Breadcrumb";

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
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        companions: checked
          ? [...prev.companions, value]
          : prev.companions.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Aquí deberías agregar tu handleSubmit si quieres enviar los datos

  return (
    <div>
      <Header />
      <Breadcrumb />
      <section className="suscribe">
        <h2>Queremos conocerte</h2>
        <Form className="form-direction">
          <Form.Group className="mb-3" controlId="formDirection">
            <Form.Label>
              Vivo en: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
              placeholder="Ciudad, Provincia, País"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSource">
            <Form.Label>
              Me enteré de Lobería por... <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Conocidos"
                name="source"
                value="Conocidos"
                checked={formData.source.includes("Conocidos")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Radio"
                name="source"
                value="Radio"
                checked={formData.source.includes("Radio")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Televisión"
                name="source"
                value="Televisión"
                checked={formData.source.includes("Televisión")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Redes Sociales"
                name="source"
                value="Redes Sociales"
                checked={formData.source.includes("Redes Sociales")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Nunca escuché"
                name="source"
                value="Nunca escuché"
                checked={formData.source.includes("Nunca escuché")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Otros"
                name="source"
                value="Otros"
                checked={formData.source.includes("Otros")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formThink">
            <Form.Label>
              Cuando pienso en Lobería pienso en
            </Form.Label>
            <Form.Control
              type="text"
              name="think"
              value={formData.think}
              onChange={handleChange}
              placeholder="Escribe una sola palabra"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProject">
            <Form.Label>
              Cuando vaya a Lobería quiero: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              placeholder="Escribe una sola"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCompanions">
            <Form.Label>
              Me gustaría ir... <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Solo/a"
                name="companions"
                value="Solo/a"
                checked={formData.companions.includes("Solo/a")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="En pareja"
                name="companions"
                value="En pareja"
                checked={formData.companions.includes("En pareja")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Con familia"
                name="companions"
                value="Con familia"
                checked={formData.companions.includes("Con familia")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Con amigos"
                name="companions"
                value="Con amigos"
                checked={formData.companions.includes("Con amigos")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Con mis mascotas"
                name="companions"
                value="Con mis mascotas"
                checked={formData.companions.includes("Con mis mascotas")}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTransport">
            <Form.Label>
              Iría en... <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Micro de larga distancia"
                name="transport"
                value="Micro de larga distancia"
                checked={formData.transport?.includes("Micro de larga distancia")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Vehículo propio"
                name="transport"
                value="Vehículo propio"
                checked={formData.transport?.includes("Vehículo propio")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Viajes compartidos"
                name="transport"
                value="Viajes compartidos"
                checked={formData.transport?.includes("Viajes compartidos")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Motorhome"
                name="transport"
                value="Motorhome"
                checked={formData.transport?.includes("Motorhome")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Tour de Agencia de viajes"
                name="transport"
                value="Tour de Agencia de viajes"
                checked={formData.transport?.includes("Tour de Agencia de viajes")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Otros"
                name="transport"
                value="Otros"
                checked={formData.transport?.includes("Otros")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>
              Nombre y Apellido: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>
              Email: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>
              Teléfono / whatsApp: <FaAsterisk className="requerided" />
            </Form.Label>
            <p style={{ fontSize: "0.9em", color: "#888" }}>
              Ingrese su número sin el 15 si es celular. Para líneas fijas, incluya el código de área. Si es del exterior, agregue +54.
            </p>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(cod) 12345"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAccept">
            <Form.Check
              type="checkbox"
              label="Acepto recibir información por correo electrónico y las Políticas de Privacidad"
              name="accept"
              checked={formData.accept}
              onChange={e => setFormData(prev => ({ ...prev, accept: e.target.checked }))}
              required
            />
          </Form.Group>
          <p className="required-info">
            Los campos marcados con un asterisco (
            <FaAsterisk className="requerided" />) son obligatorios.
          </p>
          <ButtonSubmit
            text={status === "enviando" ? "Enviando..." : "Enviar"}
            disabled={status === "enviando"}
            className={`btn-success${status === "enviando" ? " sending" : ""}`}
          />

          {status === "exitoso" && (
            <p className="success-message">
              ¡Mensaje enviado exitosamente! Te responderemos a la brevedad.
            </p>
          )}
          {status === "error" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </Form>
      </section>
      <Footer />
    </div>
  );
};

export default Suscribe;
