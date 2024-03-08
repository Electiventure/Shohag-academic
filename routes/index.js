// index.js
const express = require('express');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars').create({});
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const router = express.Router();
const passportConfig = require('../config/passport'); // Adjust the path as needed
const bodyParser = require('body-parser');

// Load environment variables using dotenv
require('dotenv').config();

const app = express();

// Connect to MongoDB
require("../config/mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false }));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Custom Middleware to attach user state
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user ? req.user : null;
    next();
});
app.use(flash());

// Method Override Middleware
app.use(methodOverride('_method'));

//Express Static Middleware
app.use(express.static('public'));

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// Initialize passport with the configuration
passportConfig(passport);

// Home route
router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});
module.exports = router;