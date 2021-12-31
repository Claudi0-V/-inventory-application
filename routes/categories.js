const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController.js");
const isAuth = require("../configs/authMiddleware.js")

router.get("/", categoriesController.categoriesIndex);

router.post("/", isAuth, categoriesController.postNewCategory);

router.get("/new-category", isAuth, categoriesController.getNewCategory);

router.get("/:category", categoriesController.getspecificCategory);

router.delete("/:category", isAuth, categoriesController.deleteCategory);

router.get("/:name/:error", categoriesController.deleteError);

module.exports = router;
