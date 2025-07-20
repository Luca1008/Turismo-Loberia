const { body, param, validationResult } = require('express-validator');

/**
 * Middleware para validar los resultados de la validación
 */
const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: errors.array()
        });
    }
    next();
};

/**
 * Validadores para el registro de usuarios
 */
const registerValidators = [
    body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('surname')
        .notEmpty().withMessage('El apellido es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('nick')
        .notEmpty().withMessage('El nick es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El nick debe tener entre 2 y 50 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateResults
];

/**
 * Validadores para el login
 */
const loginValidators = [
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida'),
    validateResults
];

/**
 * Validadores para seguir a un usuario
 */
const followValidators = [
    body('followed')
        .notEmpty().withMessage('El ID del usuario a seguir es requerido')
        .isMongoId().withMessage('El ID del usuario no es válido'),
    validateResults
];

/**
 * Validadores para parámetros de ID
 */
const idParamValidator = [
    param('id')
        .isMongoId().withMessage('El ID no es válido'),
    validateResults
];

/**
 * Validadores para la actualización de usuario
 */
const updateUserValidators = [
    body('name')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('surname')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('nick')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nick debe tener entre 2 y 50 caracteres'),
    body('email')
        .optional()
        .isEmail().withMessage('El email debe ser válido'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateResults
];

module.exports = {
    registerValidators,
    loginValidators,
    followValidators,
    idParamValidator,
    updateUserValidators
}; 