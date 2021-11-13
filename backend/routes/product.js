const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  getProducts,
  getSingleProducts,
} = require("../controller/productControllr");

const router = express.Router();

// @desc.....Fetch all products...
// @route.....GET api/products/:id...
// @access.....Public...
router.get("/", asyncHandler(getProducts));

// @desc.....Fetch Single products...
// @route.....GET api/products...
// @access.....Public...
router.get("/:id", asyncHandler(getSingleProducts));

module.exports = router;
