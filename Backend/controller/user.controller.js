const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura';

exports.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    // Validaciones básicas
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ status: 'error', message: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    // Verificar si el usuario ya existe
    const userExists = await db.query('SELECT * FROM turismo_prueba.users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(200).json({ status: 'success', message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario en la base de datos (sin imagen de perfil)
    await db.query(
      'INSERT INTO turismo_prueba.users (name, surname, email, password) VALUES ($1, $2, $3, $4)',
      [name, surname, email, hashedPassword]
    );

    return res.status(200).json({ status: 'success', message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ status: 'error', message: 'Error al registrar usuario' });
  }
};

// Preparar función loginUser (a implementar)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const userResult = await db.query('SELECT * FROM turismo_prueba.users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Usuario o contraseña incorrectos.' });
    }
    const user = userResult.rows[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ status: 'error', message: 'Usuario o contraseña incorrectos.' });
    }

    // Generar token JWT
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    };
    const token = jwt.encode(payload, JWT_SECRET);

    return res.status(200).json({
      status: 'success',
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
  }
};

exports.getProfile = (req, res) => {
  // req.user contiene los datos del token decodificado
  res.json({
    status: 'success',
    user: req.user
  });
}; 