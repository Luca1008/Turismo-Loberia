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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// 🔽 Agrega esta línea antes de las rutas
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', cardsRoutes);
app.use('/api', utilsRoutes);
app.use('/api', userRoutes);
app.use('/api', carouselRoutes);
// 💬 Traducción (proxy)
app.use("/api/translate", translateRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
