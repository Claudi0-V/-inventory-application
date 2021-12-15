const express = require("express");
const router = express.Router();
const Item = require('../models/items.js')


router.get("/",  (req, res,) => {
    res.render('categories_category', {title: "all categories"})
});

router.get('/new-category', (req, res) => {
    res.render('categories_new-category', {title: "new category"})
})

router.post('/new-category', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save()
        res.redirect('/');
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/:category", async (req, res) => {
    const category = req.params.category;
    const categories = await Item.find({category})
    res.render('categories_categories_specific-category', {categories});

} )

module.exports = router;
