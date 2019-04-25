const express = require("express");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");
router.post("/upgrade", upgradeController.upgrade)
module.exports = router;
