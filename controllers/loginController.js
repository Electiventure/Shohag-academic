// loginController.js
const passport = require('passport');

const loginGet = (req, res) => {
    res.render('login');
};

const loginPost = (req, res, next) => {
passport.authenticate('local', {
    successRedirect: '/measurements',
    failureRedirect: '/login',
    failureFlash: true
})(req, res, next);
};

const dashboardGet = (req, res) => {
    const welcomeMessage = `Welcome, ${req.user.username}! This is your dashboard.`;
    res.render('dashboard', { user: req.user, message: welcomeMessage });
};

const logout = (req, res) => {
req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
    });
};

module.exports = {
    loginGet,
    loginPost,
    dashboardGet,
    logout
};
