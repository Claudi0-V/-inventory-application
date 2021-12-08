// nane description url
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        max: 125,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
})

const Category = mongoose.model('Category', CategoryScheme)
module.exports = Category;
