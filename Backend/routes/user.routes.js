const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { registerValidators, loginValidators } = require('../middlewares/validators');

// Ruta para registrar usuario (con validaciones)
router.post('/user/register', registerValidators, userController.registerUser);

// Ruta para login de usuario (con validaciones)
router.post('/user/login', loginValidators, userController.loginUser);

module.exports = router; 