const express = require('express');
const router = express.Router();

const fakeItems = [{
  'name': 'pencil',
  'description': 'small pencil',
  'category': 'school',
  'price': 199,
  'stock_quantity': 25
}];

/* GET home page. */
router.get('/', (req, res) => {
  res.render('items_all-items', { title: 'inventory', items: fakeItems});
});

router.post('/', (req, res) => {
    try {
        fakeItems.push(req.body)
        res.redirect('/items')
    } catch (err) {
        console.log(err)
    }
})

router.get('/new-item', (req, res) => {
    res.render('items_new-item', {title: "Add New Item"})
})

router.get('/:item', (req, res) => {
    const itemParam = req.params;
    const [specificItem] = fakeItems.filter(item => item.name === itemParam.item);
    res.render('items_specific-item', {title: specificItem.name, item: specificItem})
})


module.exports = router;
