const mongoose = require('../db/connection');

const VendorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        URL: {
            type: String,
            require: false,
            validate: {
                validator: function(url) {
                    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
                }
            }
        },
        items: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
        }]
    },
    {timestamps: true}
)

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;