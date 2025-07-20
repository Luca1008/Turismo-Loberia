/**
 * Middleware para manejar errores de forma centralizada
 * @param {Error} err - Objeto de error
 * @param {Request} req - Objeto de petición
 * @param {Response} res - Objeto de respuesta
 * @param {NextFunction} next - Función next
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Errores de validación de Mongoose
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    // Errores de ID inválido
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'ID inválido'
        });
    }

    // Errores de duplicación
    if (err.code === 11000) {
        return res.status(409).json({
            status: 'error',
            message: 'El recurso ya existe'
        });
    }

    // Errores de autenticación
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token inválido'
        });
    }

    // Errores de autorización
    if (err.name === 'UnauthorizedError') {
        return res.status(403).json({
            status: 'error',
            message: 'No tienes permisos para realizar esta acción'
        });
    }

    // Error por defecto
    return res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler; 