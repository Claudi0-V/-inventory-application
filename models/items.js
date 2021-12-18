const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  description: {
    type: String,
    min: 10,
    max: 150,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    min: 2,
    required: true,
  },
  stock_quantity: {
    type: Number,
    min: 0,
    required: true,
  },
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
