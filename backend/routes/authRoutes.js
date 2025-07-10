const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getCurrentUser } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);
router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
