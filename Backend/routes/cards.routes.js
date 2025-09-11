const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // ✔️ SOLO esta
const cardsController = require('../controller/cards.controller');

/**
 * @route GET /api/test
 * @desc Ruta de prueba para verificar que el router funciona
 * @access Public
 */
router.get('/test', (req, res) => res.send('✅ RUTA TEST FUNCIONA'));

/**
 * @route GET /api/cards
 * @desc Obtiene todas las cards procesadas (filtradas/transformadas)
 * @access Public
 */
router.get('/cards', cardsController.getAllCards);

/**
 * @route GET /api/cards/:id
 * @desc Obtiene una card por su ID
 * @param {string} id - ID de la card
 * @access Public
 */
router.get('/cards/:id', cardsController.getCardById);

/**
 * @route GET /api/cards-all
 * @desc Obtiene todas las cards sin procesar (raw)
 * @access Public
 */
router.get('/cards-all', cardsController.getAllCardsRaw);

/**
 * @route POST /api/cards
 * @desc Crea una nueva card con imágenes
 * @access Public
 * @param {file} card_img_portada - Imagen de portada (máx. 1)
 * @param {file} card_img - Imagen principal (máx. 1)
 */
router.post('/cards', upload.fields([
  { name: 'card_img_portada', maxCount: 1 },
  { name: 'card_img', maxCount: 1 }
]), cardsController.createCard);

/**
 * @route PUT /api/cards/:id
 * @desc Actualiza una card por ID, puede incluir imágenes
 * @param {string} id - ID de la card
 * @param {file} card_img_portada - Imagen de portada (opcional)
 * @param {file} card_img - Imagen principal (opcional)
 */
router.put('/cards/:id', upload.fields([
  { name: 'card_img_portada', maxCount: 1 },
  { name: 'card_img', maxCount: 1 }
]), cardsController.updateCard);

/**
 * @route DELETE /api/cards/:id
 * @desc Elimina una card por ID
 * @param {string} id - ID de la card
 */
router.delete('/cards/:id', cardsController.deleteCard);

module.exports = router;

