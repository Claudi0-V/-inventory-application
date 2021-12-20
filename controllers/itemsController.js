const Item = require("../models/items.js");
const Category = require("../models/categories.js");
const { body, validationResult } = require("express-validator");

const itemIndex = async (req, res) => {
  try {
    const items = await Item.find().populate("category");
    res.render("items_all-items", { title: "inventory", items });
  } catch (error) {
    console.log(error);
  }
};

const itemDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Item.findByIdAndDelete(id);
    res.json({ redirect: "/items" });
  } catch (err) {
    console.log(err);
  }
};

const itemPost = [
  [
    body("name").isLength({ min: 3, max: 50 }).escape(),
    body("description").isLength({ min: 10, max: 150 }).escape(),
    body("category").isLength({ min: 5, max: 32 }).escape(),
    body("price").isInt().escape(),
    body("stock_quantity").isInt().escape(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors) {
        res.render("items_new-item", {
          title: "Add New Item",
          error: req.body,
        });
      } else {
        const item = new Item(req.body);
        await item.save();
        res.redirect("/items");
      }
    } catch (error) {
      console.log(error);
    }
  },
];

const getNewItem = async (req, res) => {
  const categories = await Category.find();
  res.render("items_new-item", { title: "Add New Item", categories });
};

const getSpecificItem = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id).populate("category");
  res.render("items_specific-item", {
    title: item.name,
    item,
  });
};

const getUpdtadeItem = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id).populate("category");
  const categories = await Category.find();

  res.render("items_update-item", {
    title: "Update Item",
    item,
    categories,
  });
};
const postUpdateItem = [
  [
    body("name").isLength({ min: 3, max: 50 }).escape(),
    body("description").isLength({ min: 10, max: 150 }).escape(),
    body("category").isLength({ min: 5, max: 32 }).escape(),
    body("price").isInt().escape(),
    body("stock_quantity").isInt().escape(),
  ],
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const errors = validationResult(req);
      if (!errors) {
        res.render("items_update-item", {
          title: "Update Item",
          error: req.body,
        });
      } else {
        Item.findByIdAndUpdate(id, req.body, () =>
          console.log("id:", id)
        );
        res.redirect("/items");
      }
    } catch (error) {
      console.log(error);
    }
  },
];

module.exports = {
  itemIndex,
  itemDelete,
  itemPost,
  getNewItem,
  getSpecificItem,
  getUpdtadeItem,
  postUpdateItem,
};
