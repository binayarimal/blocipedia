const express = require("express");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");
router.get("/upgrade", upgradeController.upgradePage);
router.post("/checkout", upgradeController.checkout)
module.exports = router;
