// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new LocalStrategy(User.authenticate())); // Use passport-local-mongoose method

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};