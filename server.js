const express = require('express');
const app = express();
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path')
const sassMiddleware = require('node-sass-middleware');


app.set('view engine', 'ejs');
app.use(ejsLayouts)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sassMiddleware({
    src: path.join(__dirname, 'bootstrap'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(__dirname + '/public'));
//app.use(methodOverride('_method'))
app.set("port", process.env.PORT || 4000);

const itemController = require('./controllers/item-controller')

app.use('/items', itemController)

app.get('/', (req, res) => {
    res.redirect('/items');
})

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
})