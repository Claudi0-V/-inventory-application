const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: String,
        min: 3,
        max: 20,
        required: true,
    },
    price: {
        type: Number,
        min: 0005,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item;
