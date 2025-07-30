const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/:id/items", orderController.addItemToOrder);
router.patch("/:id/confirm", orderController.confirmOrder);
router.patch("/:id/cancel", orderController.cancelOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
