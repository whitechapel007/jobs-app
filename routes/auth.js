const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 16 * 60 * 1000,
  max: 12,
  message: {
    msg: "too many requests please try again",
  },
});
const { register, login, updateUser } = require("../controllers/auth");
router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUSer", authenticateUser, testUser, updateUser);

module.exports = router;
