const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.starter_page);
router.get("/home", homeController.home_page);
router.get("/getTodo", homeController.get_todo);
router.post("/addTodo", homeController.add_todo);
router.put("/udStatus/:id", homeController.update_status);
router.delete("/rmTodo/:id", homeController.remove_todo);
router.get("/login", AuthenticationController.signin_page);
router.get("/signup", AuthenticationController.signup_page);
// Register user
router.post("/signup", AuthenticationController.signUp);
//login user
router.post("/login", AuthenticationController.signIn);

router.get("/logout", AuthenticationController.logout);

module.exports = router;
