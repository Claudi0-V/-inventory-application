const express = require("express");
const router = express.Router();
const Category = require("../models/categories.js");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.find();
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

router.post(
  "/",
  [
    body("name").isLength({ min: 5, max: 32 }).escape(),
    body("description").isLength({ min: 5, max: 500}).escape(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render("categories_new-category", {
          title: "new category",
          error: req.body,
        });
      } else {
        const category = new Category(req.body);
        await category.save();
        res.redirect("/categories");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/:category", async (req, res) => {
  const param = req.params.category;
  const category = await Category.find({ param });
  res.render("categories_specific-category", { category });
});

module.exports = router;
