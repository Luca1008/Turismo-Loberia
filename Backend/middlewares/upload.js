const multer = require('multer');


/**
 * Middleware de subida de archivos en memoria usando Multer.
 *
 * Almacena los archivos temporalmente en memoria (buffer) en lugar de guardarlos en disco.
 * Ideal para procesar o subir los archivos a un servicio externo (Cloud, base de datos, etc.).
 *
 * @module uploadMiddleware
 * @example
 * const express = require('express');
 * const upload = require('./middlewares/upload');
 * const app = express();
 *
 * // Ruta para subir un solo archivo llamado "image"
 * app.post('/upload', upload.single('image'), (req, res) => {
 *   console.log(req.file); // Archivo subido en memoria
 *   res.send('Archivo recibido');
 * });
 *
 * // Ruta para subir varios archivos con el mismo nombre de campo
 * app.post('/uploads', upload.array('images', 5), (req, res) => {
 *   console.log(req.files); // Array de archivos
 *   res.send('Archivos recibidos');
 * });
 */
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
