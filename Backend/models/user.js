const db = require('./db');

// Modelo de Usuario: funciones para interactuar con la tabla users
const User = {
  // Crear un nuevo usuario
  async create({ name, surname, email, password }) {
    const query = `
      INSERT INTO users (name, surname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, surname, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Buscar usuario por email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Buscar usuario por id
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = User; 