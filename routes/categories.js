const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController.js");

router.get("/", categoriesController.categoriesIndex);

router.post("/", categoriesController.postNewCategory);

router.get("/new-category", categoriesController.getNewCategory);

router.get("/:category", categoriesController.getspecificCategory);

router.delete("/:category", categoriesController.deleteCategory);

router.get("/:name/:error", categoriesController.deleteError);

module.exports = router;
