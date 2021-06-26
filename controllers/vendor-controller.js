const express = require('express');
const router = express.Router();

const Vendor = require('../models/vendor-model');
const Item = require('../models/item-model');

const unitOfMeasureOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]
const unitOfPurchaseOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]
const unitOfSaleOptions = ["each", "in", "ft", "yd", "mm", "cm", "m"]

//index
router.get('/', (req, res) => {
    Vendor.find({})
    .populate('vendor')
    .then(vendors => res.render('vendor-index', {vendors}))
    .catch(console.log)
})

//new
router.get('/new', (req, res) => {
    res.render('vendor-new')
})

//create
router.post('/', (req, res) => {
    console.log(req.body)
    // vendor.create({
    //     description: req.body.description,
    //     partNumber: req.body.partNumber || "?",
    //     quantity: req.body.quantity || 0
    // })
    // .then(result => {
    //     res.redirect('/vendors')
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.send("unable to create vendor")
    // })

})

//show
router.get('/:id', (req, res) => {
    Vendor.findOne({_id: req.params.id})
    .then(vendor => {
        console.log(vendor)
        Item.find({vendor: vendor.id})
        .then(vendorItems => {
            console.log(vendorItems)
            if(vendorItems.length > 0){
                res.render('vendor-show', {vendor, vendorItems})
            } else {
                res.render('vendor-show', {vendor, vendorItems:null})
            }
        })
    })
    .catch(console.log)
})

//edit
router.get('/:id/edit', (req, res) => {
    Vendor.findById(req.params.id)
    .then(vendor => res.render('vendor-edit', {vendor}))
    .catch(err => {
        console.log(err)
        res.send('Could not edit vendor')
    })
})

//update
router.put('/:id', (req, res) => {
    Vendor.findOneAndUpdate(
        {_id: req.params.id},
        {
            name: req.body.name,
            URL: req.body.URL,
        },
        {new: true}
    )
    .then(vendor => res.redirect('/vendors'))
    .catch(console.error);
})

//destroy
router.delete('/:id', (req, res) => {
    Vendor.findOneAndDelete({_id: req.params.id})
    .then(vendor => {
        console.log(`deleted: ${vendor}`);
        res.redirect('/vendors')
    })
    .catch(console.error)
})

module.exports = router;