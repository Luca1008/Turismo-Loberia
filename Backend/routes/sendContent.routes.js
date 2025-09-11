const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sendContentController = require("../controller/sendContent.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * @route POST /api/send
 * @desc Enviar contenido a todos los suscriptores
 * @access Public
 * @param {file} file.body.required - Archivo a enviar a los suscriptores
 */
router.post("/send", upload.single("file"), sendContentController.sendToSubscribers);

/**
 * @route POST /api/subscribe
 * @desc Agregar un nuevo suscriptor
 * @access Public
 * @param {string} name.body.required - Nombre del suscriptor
 * @param {string} email.body.required - Email del suscriptor
 */
router.post("/subscribe", sendContentController.addSubscriber);

/**
 * @route GET /api/unsubscribe/:token
 * @desc Cancelar suscripción usando token
 * @access Public
 * @param {string} token.path.required - Token único del suscriptor
 */
router.get("/unsubscribe/:token", sendContentController.unsubscribe);

module.exports = router;
