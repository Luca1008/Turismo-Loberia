const express = require("express");
const router = express.Router();

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

module.exports = router; // ✅ Asegurate de que estás exportando el router
