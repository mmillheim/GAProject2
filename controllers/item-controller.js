const express = require('express');
const router = express.Router();

const Item = require('../models/item-model');
const Vendor = require('../models/vendor-model');

//index
router.get('/', (req, res) => {
    Item.find({})
    .populate('vendor')
    .then(items => res.render('item-index', {items}))
    .catch(console.log)
})

//new

//create

//show
router.get('/:id', (req, res) => {
    Item.find({_id: req.params.id})
    .populate('vendor')
    .then(item => res.send(item))
    .catch(console.log)
})

//edit

//update

//destroy

module.exports = router;