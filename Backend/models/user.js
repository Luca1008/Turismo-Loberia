const db = require("./db");

const ALLOWED_ROLES = ["superadmin", "admin"];

/**
 * Modelo de Usuario: funciones para interactuar con la tabla `users`
 * @namespace User
 */
const User = {
  /**
   * Crea un nuevo usuario.
   * @param {Object} userData
   * @param {string} userData.name - Nombre del usuario
   * @param {string} userData.surname - Apellido del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña encriptada
   * @param {string} [userData.role="admin"] - Rol del usuario
   * @returns {Promise<Object>} Usuario creado
   */
  async create({ name, surname, email, password, role = "admin" }) {
    if (!ALLOWED_ROLES.includes(role)) {
      throw new Error(
        `Rol inválido. Debe ser uno de: ${ALLOWED_ROLES.join(", ")}`
      );
    }

    const query = `
    INSERT INTO turismo_prueba.users (name, surname, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const values = [name, surname, email, password, role];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Actualiza un usuario por su ID.
   * @param {number} id - ID del usuario
   * @param {Object} data - Campos a actualizar
   * @param {string} [data.name]
   * @param {string} [data.surname]
   * @param {string} [data.password] - Contraseña encriptada
   * @param {string} [data.role]
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updateById(id, { name, surname, password, role }) {
    if (role && !ALLOWED_ROLES.includes(role)) {
      throw new Error(
        `Rol inválido. Debe ser uno de: ${ALLOWED_ROLES.join(", ")}`
      );
    }

    const query = `
    UPDATE turismo_prueba.users
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

    /**
   * Elimina un admin por su ID. Solo puede hacerlo un superadmin.
   * @param {string} requesterEmail - Email del usuario que realiza la acción
   * @param {number} targetId - ID del usuario a eliminar
   * @returns {Promise<Object>} Usuario eliminado
   */
  async deleteAdminById(requesterEmail, targetId) {
    const requester = await this.findByEmail(requesterEmail);
    if (!requester) throw new Error("Usuario solicitante no encontrado");
    if (requester.role !== "superadmin") throw new Error("No autorizado");

    const target = await this.findById(targetId);
    if (!target) throw new Error("Usuario objetivo no encontrado");
    if (target.role !== "admin")
      throw new Error("Solo se pueden eliminar admins");

    const query = "DELETE FROM turismo_prueba.users WHERE id = $1 RETURNING *";
    const result = await db.query(query, [targetId]);
    return result.rows[0];
  },

  /**
   * Busca un usuario por su ID
   * @param {number} id
   * @returns {Promise<Object>} Usuario encontrado
   */
  async findById(id) {
    const query = "SELECT * FROM turismo_prueba.users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Busca un usuario por su email
   * @param {string} email
   * @returns {Promise<Object>} Usuario encontrado
   */
  async findByEmail(email) {
    const query = "SELECT * FROM turismo_prueba.users WHERE email = $1";
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  /**
   * Lista todos los usuarios
   * @returns {Promise<Object[]>} Lista de usuarios
   */
  async findAll() {
    const query = "SELECT * FROM turismo_prueba.users";
    const result = await db.query(query);
    return result.rows;
  },

  /**
   * Lista todos los superadmins
   * @returns {Promise<Object[]>}
   */
  async findSuperadmin() {
    const query = "SELECT * FROM turismo_prueba.users WHERE role = $1";
    const result = await db.query(query, ["superadmin"]);
    return result.rows;
  },

  /**
   * Lista todos los admins
   * @returns {Promise<Object[]>}
   */
  async findAdmins() {
    const query = "SELECT * FROM turismo_prueba.users WHERE role = $1";
    const result = await db.query(query, ["admin"]);
    return result.rows;
  },

  /**
   * Busca usuario por reset_token
   * @param {string} token
   * @returns {Promise<Object>} Usuario encontrado
   */
  async findByResetToken(token) {
    const query = "SELECT * FROM turismo_prueba.users WHERE reset_token = $1";
    const result = await db.query(query, [token]);
    return result.rows[0];
  },

  /**
   * Actualiza el reset_token y su expiración
   * @param {string} email
   * @param {string} token
   * @param {number} expiresAt - Timestamp de expiración
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updateResetToken(email, token, expiresAt) {
    const query = `
    UPDATE turismo_prueba.users
    SET reset_token = $1,
        reset_token_expires = $2
    WHERE email = $3
    RETURNING *;
  `;
    const result = await db.query(query, [token, expiresAt, email]);
    return result.rows[0];
  },

  /**
   * Limpia el reset_token después de cambiar la contraseña
   * @param {number} userId
   * @returns {Promise<Object>} Usuario actualizado
   */
  async clearResetToken(userId) {
    const query = `
    UPDATE turismo_prueba.users
    SET reset_token = NULL,
        reset_token_expires = NULL
    WHERE id = $1
    RETURNING *;
  `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  /**
   * Cambia la contraseña por ID
   * @param {number} id
   * @param {string} hashedPassword - Contraseña encriptada
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updatePasswordById(id, hashedPassword) {
    const query = `
    UPDATE turismo_prueba.users
    SET password = $1
    WHERE id = $2
    RETURNING *;
  `;
    const result = await db.query(query, [hashedPassword, id]);
    return result.rows[0];
  },
};

module.exports = User;
