const express = require("express");

const {
  authUser,
  getUserProfile,
  registerUser,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
