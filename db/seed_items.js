const seedData = require('./seed-data.json');

const User = require('../models/user-model');
const Item = require('../models/item-model');
const Vendor = require('../models/vendor-model');


// console.log(seedData[0].Users);


Item.deleteMany({})
    .then(() => {
        return Vendor.deleteMany({})
            .then(() => {
                return Vendor.create({name: "Vendor with items"})
                .then((vendor) => {
                        console.log('create vendor')
                        return seedData[0].Items.map((item) => ({...item, vendor: vendor._id}))
                    })
                    .then((items) => {
                        return Item.insertMany(items)
                    })
                    .catch(console.error)
                })
                .catch(console.error)
    })
    .catch(console.error)
    .finally(() => {
        process.exit();
    });
        
    // console.log(seedData[0].Items)
    // Item.deleteMany({})
    //     .then(() => {
    //         return Item.insertMany(seedData[0].Items)
    //     })
    //     .then(console.log)
    //     .catch(console.error)
    //     .finally(() => {
    //         process.exit();
    //     });