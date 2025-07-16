const express = require('express');
const router = express.Router();
const utilsController = require('../controller/utils.controller');

router.post('/send-email', utilsController.sendEmail);
router.get('/forecast', utilsController.getForecast);
router.get('/weather', utilsController.getWeather);

module.exports = router;