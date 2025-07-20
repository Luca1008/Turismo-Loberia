require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cardsRoutes = require('./routes/cards.routes');
const utilsRoutes = require('./routes/utils.routes');
const userRoutes = require('./routes/user.routes');
const multer = require('multer'); // ⬅️ Agregado para configuración global si se necesita

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true, // Permite cualquier origen para pruebas
  credentials: true,
}));

// 🔸 json limit pequeño para requests normales
app.use(express.json({ limit: '1mb' }));

// 🔸 para formularios con imágenes (multipart/form-data)
app.use(express.urlencoded({ extended: true })); // ✅ necesario para form-data además de json

// Rutas
app.use('/api', cardsRoutes);
app.use('/api', utilsRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
