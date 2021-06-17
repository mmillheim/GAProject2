const express = require('express');
const app = express();
const cors = require('cors');

const itemController = require('./controllers/item-controller')

app.set("port", process.env.PORT || 4000);

app.use('/items', itemController)

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
})