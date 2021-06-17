const mongoose = require('../db/connection');

const TransactionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        locked: Boolean,
        items: [{
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item'
                },
                quantity: Number
        }],
        vendor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        },
        transactionDate: Date

    },
    {timestamps: true}
)

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;