const express = require("express");
const router = express.Router();
const sendContentController = require("../controller/sendContent.controller");

router.post("/send", sendContentController.sendToSubscribers);

module.exports = router;
