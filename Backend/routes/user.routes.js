const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { registerValidators, loginValidators } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

// Ruta para registrar usuario (con validaciones)
router.post('/user/register', registerValidators, userController.registerUser);

// Ruta para login de usuario (con validaciones)
router.post('/user/login', loginValidators, userController.loginUser);

// List admins (Tiene que ir antes de getById)
router.get('/user/admins', userController.getAllAdmins);

// User by id
router.get('/user/:id', userController.getUserById);

// Update
router.put('/user/:id', auth, userController.updateUser);

// Delete
router.delete('/user/:id', auth, userController.deleteUser);

// Forgot password
router.post('/user/recuperar-password', userController.forgotPassword);

// Reset Password
router.post('/user/reset-password', userController.resetPassword);


module.exports = router; 