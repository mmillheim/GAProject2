const express = require('express');
const app = express();
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(ejsLayouts)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(methodOverride('_method'))
app.set("port", process.env.PORT || 4000);

const itemController = require('./controllers/item-controller')

app.use('/items', itemController)

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
})