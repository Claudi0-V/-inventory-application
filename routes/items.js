const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController.js");

router.get("/", itemsController.itemIndex);
router.delete("/:id", itemsController.itemDelete);
router.post("/", itemsController.itemPost);
router.get("/new-item", itemsController.getNewItem);
router.get("/:id", itemsController.getSpecificItem);
router.get("/:id/update", itemsController.getUpdtadeItem);

router.post("/:id/update", itemsController.postUpdateItem);

module.exports = router;
