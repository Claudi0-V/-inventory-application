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
    min: 5,
    max: 500,
    required: true,
  },
});

const Category = mongoose.model("Category", CategoryScheme);
module.exports = Category;
