const path = require("path");
const fs = require("fs");

// Guarda imágenes del carrusel según la ciudad seleccionada
exports.uploadCarouselImages = (req, res) => {
  const city = req.body.city;
  if (!city) {
    return res.status(400).json({ error: "Ciudad requerida" });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No se subieron imágenes" });
  }

res.json({
    message: "Imagen subida correctamente",
    file: {
      filename: req.file.filename,
      url: `/public/carousel/${city}/${req.file.filename}`,
    },
  });
};

// (Opcional) Listar imágenes del carrusel para una ciudad
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

// Elimina imágenes del carrusel según la ciudad seleccionada
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