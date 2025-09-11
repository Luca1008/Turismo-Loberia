const express = require("express");
const router = express.Router();

/**
 * @route POST /translate
 * @group Traducción - Endpoints de traducción de texto
 * @param {string} q.body.required - Texto a traducir
 * @param {string} [source.body="es"] - Idioma de origen (ej: "es")
 * @param {string} [target.body="en"] - Idioma de destino (ej: "en")
 * @param {string} [format.body="text"] - Formato del contenido ("text" o "html")
 * @returns {Object} 200 - { translatedText: string }
 * @returns {Error} 500 - Error al traducir el texto
 */
router.post("/", async (req, res) => {
  const { q, source = "es", target = "en", format = "text" } = req.body;

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en el proxy de traducción:", error);
    res.status(500).json({ error: "Error al traducir texto" });
  }
});

module.exports = router;
