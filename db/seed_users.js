const seedData = require('./seed-data.json');

const User = require('../models/user-model');
const Item = require('../models/item-model');
const Vendor = require('../models/vendor-model');


// console.log(seedData[0].Users);

User.deleteMany({})
    .then(() => {
        return User.insertMany(seedData[0].Users)
    })
    .then(console.log)
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