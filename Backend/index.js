require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cardsRoutes = require('./routes/cards.routes');
const utilsRoutes = require('./routes/utils.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', cardsRoutes);
app.use('/api', utilsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
console.log('🧠 ESTE ES EL INDEX REAL QUE SE ESTÁ EJECUTANDO');
