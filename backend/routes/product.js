const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  getProducts,
  getSingleProducts,
} = require("../controller/productControllr");

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getSingleProducts));

module.exports = router;
