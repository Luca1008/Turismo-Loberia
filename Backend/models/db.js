const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'Lucale1234o100',
  database: process.env.DB_NAME || 'loberia',
  search_path: ['turismo_prueba', 'public'],
});
console.log('🔍 Variables de conexión:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

module.exports = db;