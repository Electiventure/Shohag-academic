//config/auth.js
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(400).send('Please log in to view that resource');
    res.redirect('/users/login');
  }
};
