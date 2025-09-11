const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription.controller");

/**
 * @route POST /subscriptions
 * @group Subscriptions - Operaciones sobre suscripciones
 * @param {string} direction.body - Dirección del suscriptor
 * @param {string} think.body - Opinión o comentario del suscriptor
 * @param {string} project.body - Proyecto asociado
 * @param {string} name.body.required - Nombre del suscriptor
 * @param {string} email.body.required - Email del suscriptor
 * @param {string} phone.body - Teléfono del suscriptor
 * @param {number} companions.body - Número de acompañantes
 * @param {string[]} transport.body - Medios de transporte seleccionados
 * @param {string[]} source.body - Cómo conoció el proyecto
 * @param {boolean} [accept.body=false] - Aceptación de términos
 * @returns {Object} 201 - { message, data }
 * @returns {Error} 500 - Error al guardar la suscripción
 */
router.post("/", subscriptionController.createSubscription);

/**
 * @route GET /subscriptions
 * @group Subscriptions - Operaciones sobre suscripciones
 * @returns {Array<Object>} 200 - Lista de suscripciones
 * @returns {Error} 500 - Error al obtener las suscripciones
 */
router.get("/", subscriptionController.getAllSubscriptions);

/**
 * @route GET /subscriptions/paginated
 * @group Subscriptions - Operaciones sobre suscripciones
 * @param {number} [page.query=1] - Número de página
 * @param {number} [limit.query=10] - Límite de elementos por página
 * @param {string} [search.query] - Texto a buscar (nombre o email)
 * @returns {Object} 200 - { page, totalPages, totalItems, data }
 * @returns {Error} 500 - Error al obtener las suscripciones
 */
router.get("/paginated", subscriptionController.getSubscriptions);

/**
 * @route GET /subscriptions/stats
 * @group Subscriptions - Operaciones sobre suscripciones
 * @returns {Object} 200 - {
 *   total: number,
 *   transport: Array<{ transporte: string, count: number }>,
 *   source: Array<{ source_option: string, count: number }>,
 *   accept: Array<{ accept: boolean, count: number }>
 * }
 * @returns {Error} 500 - Error al obtener estadísticas
 */
router.get("/stats", subscriptionController.getStats);

module.exports = router;
