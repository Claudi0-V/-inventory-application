const express = require("express");
const router = express.Router();
const Item = require('../models/items.js')


router.post('/category', async (req, res) => {
    try {
    const item = new Item(req.body);
    const result = await item.save()
    res.redirect('/');
        }
    catch (err) {
        console.log(err)
    }
})


router.get("/category", function (req, res, next) {
    const category = req.params.category;
    Item.find({category})

  res.render();
});


module.exports = router;
