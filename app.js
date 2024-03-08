// app.js
const express = require('express');
const expressHandlebars = require('express-handlebars').create({});
//const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const bodyParser = require('body-parser');

// File links
//const passportConfig = require('./config/passport'); // Adjust the path as needed
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");


//Routes link
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const measurementsRoutes = require('./routes/measurements');

const app = express();

// dotenv
require('dotenv').config();

// Connect to MongoDB
require("./config/mongoose");

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');
//app.set("view engine", "ejs");
//app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Express Static Middleware
app.use(express.static('public'));

// Method Override Middleware
app.use(methodOverride('_method'));

// Initialize passport with the configuration
//passportConfig(passport);

// Custom Middleware to attach user state
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user ? req.user : null;
    next();
});

// Routes setup 
app.use('/',checkAuth,indexRoutes);
app.use('/users', usersRoutes);
app.use('/measurements', measurementsRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
