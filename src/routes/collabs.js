const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");
router.post("/wikis/:id/collab", collabController.collab);

module.exports = router;
