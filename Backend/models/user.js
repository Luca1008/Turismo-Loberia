const db = require("./db");

const ALLOWED_ROLES = ["superadmin", "admin"];

// Modelo de Usuario: funciones para interactuar con la tabla users
const User = {
  // Crear un nuevo usuario
  async create({ name, surname, email, password, role = "admin" }) {
    if (!ALLOWED_ROLES.includes(role)) {
      throw new Error(
        `Rol inválido. Debe ser uno de: ${ALLOWED_ROLES.join(", ")}`
      );
    }

    const query = `
    INSERT INTO users (name, surname, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const values = [name, surname, email, password, role];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Editar por id

  async updateById(id, { name, surname, password, role }) {
    if (role && !ALLOWED_ROLES.includes(role)) {
      throw new Error(
        `Rol inválido. Debe ser uno de: ${ALLOWED_ROLES.join(", ")}`
      );
    }

    const query = `
    UPDATE users
    SET name = COALESCE($2, name),
        surname = COALESCE($3, surname),
        password = COALESCE($4, password),
        role = COALESCE($5, role)
    WHERE id = $1
    RETURNING *;
  `;
    const values = [id, name, surname, password, role];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  //Eliminar por id

  async deleteAdminById(requesterEmail, targetId) {
    const requester = await this.findByEmail(requesterEmail);
    if (!requester) throw new Error("Usuario solicitante no encontrado");
    if (requester.role !== "superadmin") throw new Error("No autorizado");

    const target = await this.findById(targetId);
    if (!target) throw new Error("Usuario objetivo no encontrado");
    if (target.role !== "admin")
      throw new Error("Solo se pueden eliminar admins");

    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await db.query(query, [targetId]);
    return result.rows[0];
  },

  // Buscar usuario por id
  async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  // Buscar usuario por email
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Listar usuarios
  async findAll() {
    const query = "SELECT * FROM users";
    const result = await db.query(query);
    return result.rows;
  },

  // Listar superadmin (unico)
  async findSuperadmin() {
    const query = "SELECT * FROM users WHERE role = $1";
    const result = await db.query(query, ["superadmin"]);
    return result.rows;
  },

  // Listar admins
  async findAdmins() {
    const query = "SELECT * FROM users WHERE role = $1";
    const result = await db.query(query, ["admin"]);
    return result.rows;
  },
};

module.exports = User;
