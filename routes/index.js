const express = require("express");
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get("/register", (req, res) => {
    return res.render("register");
  });
  
  router.get("/login", (req, res) => {
    return res.render("login");
  });
  
// Logout
router.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
//   router.get("/logout", (req, res) => {
//     return res.render("logout");
//   });

module.exports = router;