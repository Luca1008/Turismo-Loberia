const express = require('express');
const router = express.Router();
const utilsController = require('../controller/utils.controller');

/**
 * @route POST /send-email
 * @group Utilidades - Email
 * @param {string} name.body.required - Nombre del remitente
 * @param {string} email.body.required - Email del remitente
 * @param {string} subject.body.required - Asunto del mensaje
 * @param {string} message.body.required - Cuerpo del mensaje
 * @returns {Object} 200 - { message: "Correo enviado exitosamente." }
 * @returns {Error} 400 - Faltan campos obligatorios
 * @returns {Error} 500 - Error al enviar correo
 */
router.post('/send-email', utilsController.sendEmail);

/**
 * @route GET /forecast
 * @group Utilidades - Clima
 * @param {string} [city.query] - Nombre de la ciudad
 * @param {number} [lat.query] - Latitud
 * @param {number} [lon.query] - Longitud
 * @returns {Array<Object>} 200 - Pronóstico de los próximos 5 días
 * @returns {Error} 400 - Faltan parámetros
 * @returns {Error} 500 - Error al obtener pronóstico
 */
router.get('/forecast', utilsController.getForecast);

/**
 * @route GET /weather
 * @group Utilidades - Clima
 * @param {string} [city.query] - Nombre de la ciudad
 * @param {number} [lat.query] - Latitud
 * @param {number} [lon.query] - Longitud
 * @returns {Object} 200 - Clima actual
 * @returns {Error} 400 - Faltan parámetros
 * @returns {Error} 500 - Error al obtener clima
 */
router.get('/weather', utilsController.getWeather);

module.exports = router;