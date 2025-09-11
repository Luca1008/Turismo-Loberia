const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { registerValidators, loginValidators } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

/**
 * @route POST /user/register
 * @group Usuarios - Registro y gestión
 * @param {string} name.body.required - Nombre del usuario
 * @param {string} surname.body.required - Apellido del usuario
 * @param {string} email.body.required - Email del usuario
 * @param {string} password.body.required - Contraseña del usuario
 * @param {string} [role.body] - Rol del usuario (solo 'admin' permitido)
 * @returns {Object} 200 - { status, message }
 * @returns {Error} 400 - Error de validación
 * @returns {Error} 500 - Error interno del servidor
 */
router.post('/user/register', registerValidators, userController.registerUser);

/**
 * @route POST /user/login
 * @group Usuarios - Autenticación
 * @param {string} email.body.required - Email del usuario
 * @param {string} password.body.required - Contraseña del usuario
 * @returns {Object} 200 - { status, message, token, user }
 * @returns {Error} 400 - Usuario o contraseña incorrectos
 * @returns {Error} 500 - Error interno del servidor
 */
router.post('/user/login', loginValidators, userController.loginUser);

/**
 * @route GET /user/admins
 * @group Usuarios - Administración
 * @returns {Array<Object>} 200 - Lista de administradores
 * @returns {Error} 500 - Error interno del servidor
 */
router.get('/user/admins', userController.getAllAdmins);

/**
 * @route GET /user/{id}
 * @group Usuarios - Gestión individual
 * @param {number} id.path.required - ID del usuario
 * @returns {Object} 200 - Datos del usuario
 * @returns {Error} 404 - Usuario no encontrado
 * @returns {Error} 500 - Error interno del servidor
 */
router.get('/user/:id', userController.getUserById);

/**
 * @route PUT /user/{id}
 * @group Usuarios - Gestión individual
 * @param {number} id.path.required - ID del usuario
 * @param {string} [name.body] - Nuevo nombre
 * @param {string} [surname.body] - Nuevo apellido
 * @param {string} [email.body] - Nuevo email
 * @param {string} [password.body] - Nueva contraseña
 * @returns {Object} 200 - { status, message }
 * @returns {Error} 400 - Error de validación
 * @returns {Error} 401 - No autorizado
 * @returns {Error} 500 - Error interno del servidor
 */
router.put('/user/:id', auth, userController.updateUser);

/**
 * @route DELETE /user/{id}
 * @group Usuarios - Gestión individual
 * @param {number} id.path.required - ID del usuario
 * @returns {Object} 200 - { status, message }
 * @returns {Error} 401 - No autorizado
 * @returns {Error} 404 - Usuario no encontrado
 * @returns {Error} 500 - Error interno del servidor
 */
router.delete('/user/:id', auth, userController.deleteUser);

/**
 * @route POST /user/recuperar-password
 * @group Usuarios - Recuperación de contraseña
 * @param {string} email.body.required - Email del usuario
 * @returns {Object} 200 - { status, message }
 * @returns {Error} 404 - Usuario no encontrado
 * @returns {Error} 500 - Error interno del servidor
 */
router.post('/user/recuperar-password', userController.forgotPassword);

/**
 * @route POST /user/reset-password
 * @group Usuarios - Recuperación de contraseña
 * @param {string} token.body.required - Token de recuperación
 * @param {string} password.body.required - Nueva contraseña
 * @returns {Object} 200 - { status, message }
 * @returns {Error} 400 - Token expirado o inválido
 * @returns {Error} 500 - Error interno del servidor
 */
router.post('/user/reset-password', userController.resetPassword);


module.exports = router; 