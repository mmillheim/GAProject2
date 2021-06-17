const mongoose = require('../db/connection');

const ItemSchema = new mongoose.Schema(
    {
        partNumber: String,
        description: {
            type: String,
            required: true,
        },
        unitOfMeasure: String,
        unitOfPurchase: String,
        unitOfSale: String,
        minimumOnHand: Number,
        maximumOnHand: Number,
        quantityBearing: Boolean,
        buyToOrder: Boolean,
        stockItem: Boolean,
        category: String,
        group: String,
        safetyStock: Number,
        leadTime: Number,
        cost: Number,
        price: Number,
        quantity: Number,
        expirationDate: Date,
        vendor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    },
    {timestamps: true}
)

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;