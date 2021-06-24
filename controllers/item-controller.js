const express = require('express');
const router = express.Router();

const Item = require('../models/item-model');
const Vendor = require('../models/vendor-model');

const unitOfMeasureOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]
const unitOfPurchaseOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]
const unitOfSaleOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]

//index
router.get('/', (req, res) => {
    Item.find({})
    .populate('vendor')
    .then(items => res.render('item-index', {items}))
    .catch(console.log)
})

//new
router.get('/new', (req, res) => {
    res.render('item-new')
})

//create
router.post('/', (req, res) => {
    console.log(req.body)
    // Item.create({
    //     description: req.body.description,
    //     partNumber: req.body.partNumber || "?",
    //     quantity: req.body.quantity || 0
    // })
    // .then(result => {
    //     res.redirect('/items')
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.send("unable to create item")
    // })

})

//show
router.get('/:id', (req, res) => {
    Item.findOne({_id: req.params.id})
    .populate('vendor')
    .then(item => {
        console.log(item)
        res.render('item-show', {item})
    })
    .catch(console.log)
})

//edit
router.get('/:id/edit', (req, res) => {
    Item.findById(req.params.id)
    .then(item => res.render('item-edit', {item}))
    .catch(err => {
        console.log(err)
        res.send('Could not edit item')
    })
})

//update
router.put('/:id', (req, res) => {
    Item.findOneAndUpdate(
        {_id: req.params.id},
        {
            description: req.body.description,
            partNumber: req.body.partNumber,
            quantity: req.body.quantity
        },
        {new: true}
    )
    .then(item => res.redirect('/items'))
    .catch(console.error);
})

//destroy
router.delete('/:id', (req, res) => {
    Item.findOneAndDelete({_id: req.params.id})
    .then(item => {
        console.log(`deleted: ${item}`);
        res.redirect('/items')
    })
    .catch(console.error)
})

module.exports = router;