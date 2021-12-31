const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController.js");
const isAuth = require("../configs/authMiddleware.js")

router.get("/", itemsController.itemIndex);
router.delete("/:id", isAuth, itemsController.itemDelete);
router.post("/", isAuth, itemsController.itemPost);
router.get("/new-item", itemsController.getNewItem);
router.get("/:id", itemsController.getSpecificItem);
router.get("/:id/update", itemsController.getUpdtadeItem);

router.post("/:id/update", isAuth, itemsController.postUpdateItem);

module.exports = router;
