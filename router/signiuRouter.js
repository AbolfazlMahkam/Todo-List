const express = require("express");
const signiuController = require("../controllers/signiuController");
const router = express.Router();

router.get("/", signiuController.starter_page);
router.get("/signup", signiuController.signup_page);
// Register user
router.post("/signup", signiuController.signup_savedb);
//login user
router.post("/login", signiuController.signin_check);

module.exports = router;