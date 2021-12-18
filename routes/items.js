const express = require("express");
const router = express.Router();
const Item = require("../models/items.js");
const { body, validationResult } = require("express-validator");

const fakeItems = [
  {
    name: "pencil",
    description: "small pencil",
    category: "school",
    price: 199,
    stock_quantity: 25,
  },
];

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("items_all-items", { title: "inventory", items });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/",
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
  }
);

router.get("/new-item", (req, res) => {
  res.render("items_new-item", { title: "Add New Item" });
});

router.get("/:item", async (req, res) => {
  const itemParam = req.params.item;
  const item = await Item.find({ itemParam });
  res.render("items_specific-item", {
    title: item.name,
    item,
  });
});

module.exports = router;
