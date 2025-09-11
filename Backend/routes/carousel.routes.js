const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const carouselController = require("../controller/carousel.controller");

const router = express.Router();

// Configuración de almacenamiento dinámico según ciudad
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const city = req.body.city;
    const dir = path.join(__dirname, "..", "public", "carousel", city);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const city = req.body.city;
    const ext = path.extname(file.originalname);
    cb(null, `${city}${ext}`);
  },
});
const upload = multer({ storage });

/**
 * @route POST /api/carousel
 * @desc Subir imagen del carrusel para una ciudad
 * @access Public
 * @param {string} city.body.required - Nombre de la ciudad
 * @param {file} image.body.required - Imagen a subir
 */
router.post(
  "/carousel",
  upload.single("image"),
  carouselController.uploadCarouselImages
);

/**
 * @route GET /api/carousel/:city
 * @desc Listar todas las imágenes del carrusel de una ciudad
 * @access Public
 * @param {string} city.path.required - Nombre de la ciudad
 */
router.get(
  "/carousel/:city",
  carouselController.listCarouselImages
);

/**
 * @route DELETE /api/carousel/:city
 * @desc Eliminar la imagen del carrusel de una ciudad
 * @access Public
 * @param {string} city.path.required - Nombre de la ciudad
 */
router.delete(
  "/carousel/:city",
  carouselController.deleteCarouselImage
);

module.exports = router;