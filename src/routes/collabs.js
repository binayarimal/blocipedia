const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");
router.post("/wikis/:id/collab", collabController.collab);
router.post("/wikis/:id/destroyCollab", collabController.destroy);

module.exports = router;
