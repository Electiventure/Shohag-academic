//routes/users.js
const express = require('express');
const router = express.Router();

const {registerPost,loginPost,logout} = require('../controllers/userController');
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

// Register
router.post('/register', registerPost);

// Login
router.post('/login', loginPost);

// Logout route
router.get("/logout", restrictToLoggedinUserOnly, logout);

module.exports = router;