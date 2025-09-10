import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../common/ButtonSubmit";
import NominatimAutocomplete from "../common/NominatimAutocomplete";
import { Global } from "../../helpers/Global";

/**
 * Componente `Create`
 *
 * Formulario para crear un nuevo contenido/card, con campos para título,
 * descripción, ubicación, contacto, categoría, fecha (para eventos), imagen
 * y otros detalles relevantes.
 *
 * @component
 *
 * @example
 * <Create />
 *
 * @returns {JSX.Element} Formulario de creación de contenido con validaciones y manejo de envío.
 */
const Create = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    linkUbicacion: "",
    lat: "",
    lon: "",
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

  /**
   * Actualiza el estado `formData` con los cambios de los inputs.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>} e 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Actualiza el estado `imagen` cuando se selecciona un archivo.
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  /**
   * Maneja el envío del formulario, construye un FormData y hace POST a la API.
   * Muestra mensajes de éxito o error.
   * @param {React.FormEvent<HTMLFormElement>} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");
    try {
      const data = new FormData();

      data.append("card_title", formData.titulo);
      data.append("card_description", formData.descripcion);
      data.append("card_ubicacion", formData.ubicacion);
      data.append("card_link_ubicacion", formData.linkUbicacion);
      data.append("card_lat", formData.lat);
      data.append("card_lon", formData.lon);
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

      const response = await fetch(`${Global.url}cards`, {
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
          lat: "",
          lon: "",
          horario: "",
          contacto: "",
          informacion: "",
          ciudad: "",
          categoria: "",
          fecha: "",
        });
        setImagen(null);
        setTimeout(() => window.location.reload(), 1200);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al crear la card.");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Contenido</h2>
      <Form
        className="form-create-card"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Campos de texto, select y textarea */}
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
          <NominatimAutocomplete
            onSelect={(place) => {
              const ubicacion = place.display_name;
              const linkUbicacion = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`;
              setFormData((prev) => ({
                ...prev,
                ubicacion,
                linkUbicacion,
                lat: place.lat,
                lon: place.lon,
              }));
            }}
          />
        </Form.Group>

        {formData.linkUbicacion && (
          <Form.Group className="mb-3" controlId="linkUbicacion">
            <Form.Label>Vista previa en OpenStreetMap</Form.Label>
            <div>
              <a
                href={formData.linkUbicacion}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.linkUbicacion}
              </a>
            </div>
          </Form.Group>
        )}

        {/* Otros campos: horario, contacto, información, ciudad y categoría */}
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
            <option value="Gastronomia">Gastronomía</option>
            <option value="Cultura">Cultura</option>
            <option value="Evento">Evento</option>
            <option value="Interes">Lugares de Interés</option>
            <option value="Artesanos">Artesanos</option>
            <option value="ServPublicos">Servicios Públicos</option>
            <option value="InfoUtil">Información Útil</option>
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
