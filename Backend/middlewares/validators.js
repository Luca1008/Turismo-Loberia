const { body, param, validationResult } = require('express-validator');
const ALLOWED_ROLES = ['superadmin', 'admin'];

/**
 * Middleware para validar los resultados de express-validator.
 *
 * @function validateResults
 * @param {import('express').Request} req - Objeto de petición
 * @param {import('express').Response} res - Objeto de respuesta
 * @param {import('express').NextFunction} next - Función next
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
 * Validadores para el registro de usuarios.
 *
 * @type {Array<import('express').RequestHandler>}
 * @example
 * app.post('/api/users', registerValidators, registerUser);
 */
const registerValidators = [
    body('name')
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('surname')
      .notEmpty().withMessage('El apellido es requerido')
      .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('email')
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('El email debe ser válido'),
    body('password')
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role')
      .optional()
      .isIn(ALLOWED_ROLES).withMessage(`El rol debe ser uno de: ${ALLOWED_ROLES.join(', ')}`),
    validateResults
  ];

/**
 * Validadores para el login de usuarios.
 *
 * @type {Array<import('express').RequestHandler>}
 * @example
 * app.post('/api/login', loginValidators, loginUser);
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
 * Validadores para la actualización de usuario.
 *
 * @type {Array<import('express').RequestHandler>}
 * @example
 * app.put('/api/users/:id', updateUserValidators, updateUser);
 */
const updateUserValidators = [
    body('name')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('surname')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
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
    updateUserValidators
}; 