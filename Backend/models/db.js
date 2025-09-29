const { Pool } = require('pg');
require('dotenv').config();

/**
 * Configuración y conexión a la base de datos PostgreSQL.
 * Utiliza variables de entorno para los parámetros de conexión.
 * 
 * @constant {Pool} db - Objeto de conexión a PostgreSQL
 * @example
 * const db = require('./db');
 * const result = await db.query('SELECT * FROM users');
 */
const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'Lucale1234o100',
  database: process.env.DB_NAME || 'loberia',
  search_path: ['turismo_prueba', 'public'],
});
// Mostrar en consola las variables de conexión (solo para debug)
/* console.log('🔍 Variables de conexión:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}); */

// Conectar a la base de datos
db.connect()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

module.exports = db;