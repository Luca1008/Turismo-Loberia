const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const JWT_SECRET = process.env.JWT_SECRET || 'SecretClaveProjectLoberia_2025';


//------------------------------POST user Ok (Registrar)----------------------------------
exports.registerUser = async (req, res) => {
  try {

    const { name, surname, email, password} = req.body;
    const role = 'admin'; // 👈 Variable hardcodeada

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

    // Insertar usuario en la base de datos con fijo admin
    await db.query(
      'INSERT INTO turismo_prueba.users (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5)',
      [name, surname, email, hashedPassword, role]
    );

    return res.status(200).json({ status: 'success', message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ status: 'error', message: 'Error al registrar usuario' });
  }
};

 // -------------------------------Loguear Ok-----------------------------------------
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
      role: user.role,
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
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
  }
};


//--------------------------------GET user by id-----------------------------------------
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      'SELECT id, name, surname, email, role FROM turismo_prueba.users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      status: 'success',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    return res.status(500).json({ status: 'error', message: 'Error al obtener usuario' });
  }
};


//----------------------------------Update--------------------------------
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, surname, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !surname || !email) {
      return res.status(400).json({ status: 'error', message: 'Nombre, apellido y email son obligatorios.' });
    }

    // Verificar que el usuario exista
    const result = await db.query('SELECT * FROM turismo_prueba.users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    // Preparar los datos a actualizar
    let updateQuery = 'UPDATE turismo_prueba.users SET name = $1, surname = $2, email = $3';
    let values = [name, surname, email];
    let paramIndex = 4;

    // Si se envía una nueva contraseña
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ status: 'error', message: 'La contraseña debe tener al menos 8 caracteres.' });
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

    return res.json({ status: 'success', message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return res.status(500).json({ status: 'error', message: 'Error al actualizar usuario' });
  }
};
