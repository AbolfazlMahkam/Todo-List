const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
const router = express.Router();

router.get("/", AuthenticationController.starter_page);
router.get("/signup", AuthenticationController.signup_page);
// Register user
router.post("/signup", AuthenticationController.signUp);
//login user
router.post("/login", AuthenticationController.signIn);

module.exports = router;