const path = require("path");
const fs = require("fs");

/**
 * POST /carousel
 *
 * Sube imágenes del carrusel según la ciudad seleccionada.
 *
 * @group Carousel - Operaciones sobre imágenes del carrusel
 * @param {string} city.body.required - Ciudad a la que pertenece la imagen
 * @param {file} file.formData.required - Imagen a subir
 * @returns {Object} 200 - { message, file: { filename, url } }
 * @returns {Error} 400 - Ciudad requerida o no se subieron imágenes
 */
exports.uploadCarouselImages = (req, res) => {
  const city = req.body.city;
  if (!city) {
    return res.status(400).json({ error: "Ciudad requerida" });
  }
  // La ruta usa upload.single("image"), por lo tanto el archivo está en req.file
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }
  // Eliminar cualquier archivo previo de la ciudad excepto el recién subido
  try {
    const dir = path.join(__dirname, "..", "public", "carousel", city);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((filename) => {
        if (filename !== req.file.filename) {
          try { fs.unlinkSync(path.join(dir, filename)); } catch (_) {}
        }
      });
    }
  } catch (_) {}

  res.json({
    message: "Imagen subida correctamente",
    file: {
      filename: req.file.filename,
      // Agrega un query param para bustear caché del navegador
      url: `/public/carousel/${city}/${req.file.filename}?t=${Date.now()}`,
    },
  });
};

/**
 * GET /carousel/:city
 *
 * Lista las imágenes del carrusel para una ciudad.
 *
 * @group Carousel - Operaciones sobre imágenes del carrusel
 * @param {string} city.path.required - Ciudad de la que se quieren obtener las imágenes
 * @returns {Object} 200 - { images: [ { filename, url } ] }
 */
exports.listCarouselImages = (req, res) => {
  const city = req.params.city;
  const dir = path.join(__dirname, "..", "public", "carousel", city);
  if (!fs.existsSync(dir)) {
    return res.json({ images: [] });
  }
  const files = fs.readdirSync(dir);
  const images = files.map((filename) => ({
    filename,
    url: `/public/carousel/${city}/${filename}`,
  }));
  res.json({ images });
};

/**
 * DELETE /carousel/:city
 *
 * Elimina todas las imágenes del carrusel para una ciudad.
 *
 * @group Carousel - Operaciones sobre imágenes del carrusel
 * @param {string} city.path.required - Ciudad de la que se quieren eliminar imágenes
 * @returns {Object} 200 - { message: "Imagen personalizada eliminada" }
 * @returns {Error} 404 - No existe carpeta para la ciudad
 */
exports.deleteCarouselImage = (req, res) => {
  const city = req.params.city;
  const dir = path.join(__dirname, "..", "public", "carousel", city);
  if (!fs.existsSync(dir)) {
    return res.status(404).json({ message: "No existe carpeta para la ciudad" });
  }
  // Borra todos los archivos de la carpeta de la ciudad
  fs.readdirSync(dir).forEach((filename) => {
    fs.unlinkSync(path.join(dir, filename));
  });
  res.json({ message: "Imagen personalizada eliminada" });
};