const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryScheme = new Schema({
  name: {
    type: String,
    min: 5,
    max: 32,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 5,
    max: 500,
  },
});

const Category = mongoose.model("Category", CategoryScheme);
module.exports = Category;
