const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const moment = require("moment");
const JWT_SECRET = process.env.JWT_SECRET || "SecretClaveProjectLoberia_2025";
const nodemailer = require("nodemailer");
const User = require("../models/User");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/**
 * Registrar un nuevo usuario (por defecto como admin).
 * 
 * @async
 * @function registerUser
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const role = "admin";

    if (!name || !surname || !email || !password) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Todos los campos son obligatorios.",
        });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "La contraseña debe tener al menos 8 caracteres.",
        });
    }

    // Verificar si el usuario ya existe
    const userExists = await db.query(
      "SELECT * FROM turismo_prueba.users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(200)
        .json({ status: "success", message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario en la base de datos con fijo admin
    await db.query(
      "INSERT INTO turismo_prueba.users (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5)",
      [name, surname, email, hashedPassword, role]
    );

    return res
      .status(200)
      .json({ status: "success", message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al registrar usuario" });
  }
};

/**
 * Iniciar sesión de usuario.
 * Genera un token JWT válido por 7 días.
 *
 * @async
 * @function loginUser
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const userResult = await db.query(
      "SELECT * FROM turismo_prueba.users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Usuario o contraseña incorrectos.",
        });
    }
    const user = userResult.rows[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Usuario o contraseña incorrectos.",
        });
    }

    // Generar token JWT
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
      iat: moment().unix(),
      exp: moment().add(7, "days").unix(),
    };
    const token = jwt.encode(payload, JWT_SECRET);

    return res.status(200).json({
      status: "success",
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al iniciar sesión" });
  }
};

/**
 * Obtener un usuario por su ID.
 *
 * @async
 * @function getUserById
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      "SELECT id, name, surname, email, role FROM turismo_prueba.users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      status: "success",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al obtener usuario" });
  }
};

/**
 * Actualizar datos de un usuario por ID.
 * Si se envía `password`, se encripta antes de guardarse.
 *
 * @async
 * @function updateUser
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, surname, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !surname || !email) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Nombre, apellido y email son obligatorios.",
        });
    }

    // Verificar que el usuario exista
    const result = await db.query(
      "SELECT * FROM turismo_prueba.users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    }

    // Preparar los datos a actualizar
    let updateQuery =
      "UPDATE turismo_prueba.users SET name = $1, surname = $2, email = $3";
    let values = [name, surname, email];
    let paramIndex = 4;

    // Si se envía una nueva contraseña
    if (password) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "La contraseña debe tener al menos 8 caracteres.",
          });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += `, password = $${paramIndex}`;
      values.push(hashedPassword);
      paramIndex++;
    }

    // Agregar la condición WHERE
    updateQuery += ` WHERE id = $${paramIndex}`;
    values.push(userId);

    // Ejecutar la consulta
    await db.query(updateQuery, values);

    return res.json({
      status: "success",
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al actualizar usuario" });
  }
};

/**
 * Eliminar un usuario por ID.
 *
 * @async
 * @function deleteUser
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar que el usuario exista
    const result = await db.query(
      "SELECT * FROM turismo_prueba.users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    }

    // Eliminar usuario
    await db.query("DELETE FROM turismo_prueba.users WHERE id = $1", [userId]);

    return res.json({
      status: "success",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al eliminar usuario" });
  }
};

/**
 * Obtener todos los usuarios con rol "admin".
 *
 * @async
 * @function getAllAdmins
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.getAllAdmins = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, surname, email, role FROM turismo_prueba.users WHERE role = $1",
      ["admin"]
    );

    return res.status(200).json({
      status: "success",
      admins: result.rows,
    });
  } catch (error) {
    console.error("Error al obtener admins:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al obtener administradores" });
  }
};

/**
 * Enviar correo de recuperación de contraseña.
 * Genera un token temporal válido por 1 hora.
 *
 * @async
 * @function forgotPassword
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ status: "error", message: "Email requerido" });

  try {
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    const resetToken = Math.random().toString(36).slice(2);
    const expires = Date.now() + 3600000;

    await User.updateResetToken(email, resetToken, expires);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${BASE_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: `"Turismo Lobería" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Restablecer contraseña",
      html: `
        <p>Hola ${user.name},</p>
        <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "success", message: "Correo enviado" });
  } catch (err) {
    console.error("Error al enviar email:", err);
    res.status(500).json({ status: "error", message: "Error al enviar el correo" });
  }
};

/**
 * Restablecer contraseña usando el token enviado por email.
 *
 * @async
 * @function resetPassword
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Faltan datos" });

  try {
    const user = await User.findByResetToken(token);
    if (!user) return res.status(404).json({ message: "Token inválido o usuario no encontrado" });
    if (user.reset_token_expires < Date.now())
      return res.status(400).json({ message: "El token ha expirado" });

    if (password.length < 8)
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updatePasswordById(user.id, hashedPassword);
    await User.clearResetToken(user.id);

    return res.status(200).json({ status: "success", message: "Contraseña actualizada" });
  } catch (err) {
    console.error("Error al restablecer contraseña:", err);
    return res.status(500).json({ message: "Error al restablecer contraseña" });
  }
};
