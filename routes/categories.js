const express = require("express");
const router = express.Router();
const Category = require("../models/categories.js");

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.find();
    console.log(allCategories);
    res.render("categories_category", {
      title: "All Categories",
      allCategories,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/new-category", (req, res) => {
  try {
    res.render("categories_new-category", { title: "new category" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const item = new Category(req.body);
    await item.save();
    res.redirect("/categories");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:category", async (req, res) => {
  const category = await Item.find({ req.params.category });
  res.render("categories_specific-category", { category });
});

module.exports = router;
