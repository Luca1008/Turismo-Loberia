const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription.controller");

router.post("/", subscriptionController.createSubscription);
router.get("/", subscriptionController.getAllSubscriptions);
router.get("/paginated", subscriptionController.getSubscriptions);
router.get("/stats", subscriptionController.getStats);

module.exports = router;
