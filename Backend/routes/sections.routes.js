const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middlewares/auth");
const requireSuperAdmin = require("../middlewares/requireSuperAdmin");
const { isValidCitySection } = require("../helpers/citySections");
const sectionsController = require("../controller/sections.controller");

const router = express.Router();

const validateCitySection = (req, res, next) => {
  const { city, section } = req.params;
  if (!isValidCitySection(city, section)) {
    return res.status(400).json({ error: "Ciudad o sección inválida" });
  }
  next();
};

// Un archivo fijo por sección: se reemplaza el anterior en cada subida.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { city, section } = req.params;
    const dir = path.join(__dirname, "..", "public", "sections", city, section);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `image${ext}`);
  },
});
const upload = multer({ storage });

/**
 * @route GET /api/sections/:city/:section
 * @desc Obtener el override (texto/imagen) de una sección de ciudad, si existe
 * @access Public
 */
router.get(
  "/sections/:city/:section",
  validateCitySection,
  sectionsController.getSection
);

/**
 * @route POST /api/sections/:city/:section
 * @desc Crear/actualizar/restablecer el texto y la imagen de una sección
 * @access Superadmin
 */
router.post(
  "/sections/:city/:section",
  auth,
  requireSuperAdmin,
  validateCitySection,
  upload.single("image"),
  sectionsController.upsertSection
);

module.exports = router;
