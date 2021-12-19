const express = require("express");
const router = express.Router();
const Category = require("../models/categories.js");
const Items = require("../models/items.js");
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
    body("description").isLength({ min: 5, max: 500 }).escape(),
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

router.delete("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const {name , _id } = await Category.findOne({ name: category });
    const items = await Items.find({ category: _id });
    if (items.length > 0) {
        console.log()
      res.json({ redirect: `/categories/${name}/${_id}` });
    } else {
      //await Category.deleteOne({ category });
      //res.json({ redirect: "/categories" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/:name/:error', async (req, res) => {
    const error = req.params.error
    const items = await Items.find({ category: error });
    res.render('categories_delete-error', {title: "error deleting", items})
})

router.get("/:category", async (req, res) => {
  const param = req.params.category;
  const [category] = await Category.find({ name: param });
  res.render("categories_specific-category", {
    title: category.name,
    category,
  });
});

module.exports = router;
