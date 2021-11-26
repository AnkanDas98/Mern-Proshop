const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  getProducts,
  getSingleProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} = require("../controller/productControllr");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.post("/", protect, admin, createProduct);
router.get("/:id", asyncHandler(getSingleProducts));
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);
router.post("/:id/reviews", protect, createProductReview);

module.exports = router;
