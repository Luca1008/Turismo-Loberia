const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sendContentController = require("../controller/sendContent.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/send", upload.single("file"), sendContentController.sendToSubscribers);
router.post("/subscribe", sendContentController.addSubscriber);
router.get("/unsubscribe/:token", sendContentController.unsubscribe);

module.exports = router;
