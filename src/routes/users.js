const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation")
router.get("/users/signUp",userController.signUp);
router.post("/users", validation.validateUsers, userController.create)


module.exports = router;
