require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cardsRoutes = require('./routes/cards.routes');
const utilsRoutes = require('./routes/utils.routes');
const userRoutes = require('./routes/user.routes');
const translateRoutes = require("./routes/translate");
const carouselRoutes = require('./routes/carousel.routes');
const multer = require('multer'); // ⬅️ Agregado para configuración global si se necesita
const path = require('path');
const subscriptionRoutes = require('./routes/subscription.routes');
const sendContentRoutes = require("./routes/sendContent.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas publicas para servir imágenes y otros archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    // Evitar caching agresivo del navegador en imágenes del carrusel
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));

// Rutas
app.use('/api', cardsRoutes);
app.use('/api', utilsRoutes);
app.use('/api', userRoutes);
app.use('/api', carouselRoutes);
// 💬 Traducción (proxy)
app.use("/api/translate", translateRoutes);
// Suscripciones
app.use('/api/subscriptions', subscriptionRoutes);
// Enviar contenido a suscriptores
app.use("/api/send", sendContentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
