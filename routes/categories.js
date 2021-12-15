const express = require("express");
const router = express.Router();
const Item = require('../models/items.js')
const category = require('../models/categories.js')


const fakeCategories = [
    {
        name: "fantasy",
        description: "worlds that are far away from realitty."
    },
    {
        name: "horror",
        description: "Genre that tries to elicit fear from the audience"
    }

]


router.get("/",  async (req, res,) => {
    try {
        const allCategories =  await Category.find()
        res.render('categories_category', {title: "All Categories", allCategories: fakeCategories })
    } catch (err) {
        console.log(err)
    }
});

router.get('/new-category', (req, res) => {
    res.render('categories_new-category', {title: "new category"})
})

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        fakeCategories.push(req.body)
        //const item = new Item(req.body);
        //await item.save()
       res.redirect('/categories');
    }
    catch (err) {
        console.log(err)
    }
})

/**/
router.get("/:category", async (req, res) => {
    //const category = req.params.category;
    //const categories = await Item.find({category})
    const category = req.params
    const [specificCategory] = fakeCategories.filter(item => item.name === category.category);
    console.log(specificCategory)
    res.render('categories_specific-category', {specificCategory});

} )

module.exports = router;
