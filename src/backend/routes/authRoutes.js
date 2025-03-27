// backend/routes/authRoutes.js
const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/reset-password", AuthController.resetPassword);
router.get("/me", authMiddleware, AuthController.getCurrentUser);

module.exports = router;
