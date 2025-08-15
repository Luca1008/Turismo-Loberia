const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription.controller");

// POST /api/subscriptions
router.post("/", subscriptionController.createSubscription);

// GET /api/subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// GET /api/subscriptions/paginated
router.get("/paginated", subscriptionController.getSubscriptions);

module.exports = router;
