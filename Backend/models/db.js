const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  search_path: ['turismo_prueba', 'public'],
});

db.connect()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

module.exports = db;