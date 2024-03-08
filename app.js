// app.js
const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars').create({});

// Load environment variables using dotenv
require('dotenv').config();

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

//Express Static Middleware
app.use(express.static('public'));

// Routes setup 
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const measurementsRoutes = require('./routes/measurements');
app.use('/measurements', measurementsRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
