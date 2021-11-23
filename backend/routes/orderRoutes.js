const express = require("express");

const {
  getOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controller/orderController");
const { postPaymentToStripe } = require("../controller/paymentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, getOrderItems);
router.get("/myorders", protect, getMyOrders);
router.post("/payment", protect, postPaymentToStripe);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

module.exports = router;
