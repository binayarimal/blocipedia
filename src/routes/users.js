const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation")
router.get("/users/signUp",userController.signUp);
router.post("/users", validation.validateUsers, userController.create);
router.get("/users/signIn",userController.signInForm);
router.post("/users/signIn", validation.validateUsers, userController.signIn);
router.get("/users/signOut", userController.signOut);
router.post("/upgrade", userController.upgrade);
router.post("/downgrade", userController.downgrade)


module.exports = router;
