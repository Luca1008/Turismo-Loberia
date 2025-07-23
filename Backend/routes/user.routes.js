const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { registerValidators, loginValidators } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

// Ruta para registrar usuario (con validaciones)
router.post('/user/register', registerValidators, userController.registerUser);

// Ruta para login de usuario (con validaciones)
router.post('/user/login', loginValidators, userController.loginUser);

// Ruta para obtener el perfil del usuario
router.get('/user/profile', auth, userController.getProfile);

// User by id
router.get('/user/profile/:id', userController.getProfileById);

// Update
router.put('/user/:id', auth, userController.updateUser);



module.exports = router; 