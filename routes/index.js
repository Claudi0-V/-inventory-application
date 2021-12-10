const express = require("express");
const router = express.Router();

const items = [{
  "name": "pencil",
  "description": 'small pencil',
  "category": "school",
  "price": 199,
  "stock_quantity": 25
}];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Inventory", items: items});
});

module.exports = router;
