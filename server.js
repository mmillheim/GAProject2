const express = require('express');
const app = express();
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const methodOverride = require('method-override');
var session = require('express-session');
var dotenv = require('dotenv');
dotenv.config();



//express-session
var sess = {
    secret: '48cfcd06293d3bbcb116a591526f9d5acae6ab0b2aafdaf1185da9652f8574a4',
    cookie: {},
    resave: false,
    saveUninitialized: true
};
if (app.get('env') === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;
    
    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    app.set('trust proxy', 1);
}

//Auth0
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: 'https://levelsapp.herokuapp.com',
    clientID: '7JUChbVDV0yWzajl4gOh2SOMIajPBlCE',
    issuerBaseURL: 'https://levelsapp.us.auth0.com'
};

//Passport
// environment variables
//load
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
//configure to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:4000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);
passport.use(strategy);
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//userInViews Middleware
var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(auth(config));

app.set('view engine', 'ejs');
app.use(session(sess));
app.use(methodOverride('_method'))
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
app.use(passport.initialize());
app.use(passport.session());

const itemController = require('./controllers/item-controller')
const vendorController = require('./controllers/vendor-controller');
const { stringify } = require('querystring');

app.use('/items', itemController)
app.use('/vendors', vendorController)

app.get('/welcome', (req, res) => {
    res.send('welcome')
});

// app.get('/login', (req, res) => {
//     res.send("Please Log In")
// })

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.redirect('/items');
    } else {
        res.render('index', {locals: null});
    }
});

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
});