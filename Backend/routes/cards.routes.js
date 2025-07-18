const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // ✔️ SOLO esta
const cardsController = require('../controller/cards.controller');

// Rutas CRUD
router.get('/test', (req, res) => res.send('✅ RUTA TEST FUNCIONA'));
router.get('/cards', cardsController.getAllCards);
router.get('/cards/:id', cardsController.getCardById);
router.get('/cards-all', cardsController.getAllCardsRaw);

// Con imágenes
router.post('/cards', upload.fields([
  { name: 'card_img_portada', maxCount: 1 },
  { name: 'card_img', maxCount: 1 }
]), cardsController.createCard);

router.put('/cards/:id', upload.fields([
  { name: 'card_img_portada', maxCount: 1 },
  { name: 'card_img', maxCount: 1 }
]), cardsController.updateCard);

router.delete('/cards/:id', cardsController.deleteCard);

module.exports = router;

