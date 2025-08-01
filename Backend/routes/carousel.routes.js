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

// Subir imágenes del carrusel
router.post(
  "/carousel",
  upload.single("image"),
  carouselController.uploadCarouselImages
);

// Listar imágenes del carrusel para una ciudad
router.get(
  "/carousel/:city",
  carouselController.listCarouselImages
);

// Eliminar una imagen del carrusel
router.delete(
  "/carousel/:city",
  carouselController.deleteCarouselImage
);

module.exports = router;