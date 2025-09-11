/**
 * Middleware centralizado para manejo de errores.
 *
 * Detecta distintos tipos de errores (validación, duplicación, JWT, autorización, etc.)
 * y devuelve la respuesta HTTP adecuada con un mensaje estandarizado.
 *
 * @function errorHandler
 * @param {Error} err - Objeto de error lanzado en algún middleware o ruta.
 * @param {import("express").Request} req - Objeto de petición HTTP de Express.
 * @param {import("express").Response} res - Objeto de respuesta HTTP de Express.
 * @param {import("express").NextFunction} next - Función next de Express.
 *
 * @returns {void} Envía una respuesta HTTP con el estado y mensaje según el error detectado.
 *
 * @example
 * const express = require('express');
 * const app = express();
 * const errorHandler = require('./middlewares/errorHandler');
 *
 * app.use('/api/users', userRoutes);
 * app.use(errorHandler); // Siempre al final
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