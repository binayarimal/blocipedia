const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController");
router.get("/wikis", wikiController.wikiPage);
router.get("/wikis/createPage", wikiController.createPage);
router.post("/wikis/create", wikiController.create);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit",wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.post("/wikis/:id/private",wikiController.private);
router.post("/wikis/:id/public",wikiController.public)
module.exports = router;
