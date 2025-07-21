import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../common/ButtonSubmit";

const Create = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    linkUbicacion: "",
    horario: "",
    contacto: "",
    informacion: "",
    ciudad: "",
    categoria: "",
    fecha: "",
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");
    console.log("Datos enviados:", formData);
    try {
      const data = new FormData();
      
      // Mapear los campos del frontend a los nombres que espera el backend
      data.append("card_title", formData.titulo);
      data.append("card_description", formData.descripcion);
      data.append("card_ubicacion", formData.ubicacion);
      data.append("card_link_ubicacion", formData.linkUbicacion);
      data.append("card_horario", formData.horario);
      data.append("card_contacto", formData.contacto);
      data.append("card_info", formData.informacion);
      data.append("card_city", formData.ciudad);
      data.append("card_category", formData.categoria);
      if (formData.categoria === "Evento") {
        data.append("card_date", formData.fecha);
      }
      
      if (imagen) {
        data.append("card_img_portada", imagen);
      }
      
      const response = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        body: data,
      });
      
      if (response.ok) {
        setMensaje("¡Contenido creado exitosamente!");
        setFormData({
          titulo: "",
          descripcion: "",
          ubicacion: "",
          linkUbicacion: "",
          horario: "",
          contacto: "",
          informacion: "",
          ciudad: "",
          categoria: "",
          fecha: "",
        });
        setImagen(null);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1200); // Espera 1.2 segundos para mostrar el mensaje
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al crear la card.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Agregar Contenido</h3>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Título del lugar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ubicacion">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ubicación"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="linkUbicacion">
          <Form.Label>Link de Ubicación (Google Maps)</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://maps.google.com/..."
            name="linkUbicacion"
            value={formData.linkUbicacion}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="horario">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="contacto">
          <Form.Label>Contacto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Teléfono, email, etc."
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="informacion">
          <Form.Label>Información</Form.Label>
          <Form.Control
            type="text"
            placeholder="Información"
            name="informacion"
            value={formData.informacion}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ciudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Select
            aria-label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Lobería">Lobería</option>
            <option value="Arenas Verdes">Arenas Verdes</option>
            <option value="San Manuel">San Manuel</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="categoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="Categoría"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Cultura">Cultura</option>
            <option value="Evento">Evento</option>
          </Form.Select>
        </Form.Group>
        {formData.categoria === "Evento" && (
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha del evento</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Imagen de Portada</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
        {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <ButtonSubmit
          type="submit"
          text={loading ? "Cargando..." : "Crear"}
          className={`btn btn-success ${loading ? "loading" : ""}`}
          disabled={loading}
        />
      </Form>
    </div>
  );
};

export default Create;
