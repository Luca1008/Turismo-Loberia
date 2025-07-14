const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards.controller');

// Rutas para operaciones CRUD de cards
router.get('/cards', cardsController.getAllCards);
router.get('/cards/:id', cardsController.getCardById);
router.get('/cards-all', cardsController.getAllCardsRaw); // todas sin filtros
router.post('/cards', cardsController.createCard);
router.put('/cards/:id', cardsController.updateCard);
router.delete('/cards/:id', cardsController.deleteCard);

module.exports = router;