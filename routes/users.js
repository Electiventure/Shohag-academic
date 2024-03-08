//routes/users.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');
const loginController = require('../controllers/loginController.js');
const auth = require('../config/auth.js');

// Register
router.get('/register', registerController.registerGet);
router.post('/register', registerController.registerPost);

// Login
router.get('/login', loginController.loginGet);
router.post('/login', loginController.loginPost);

//Dashboard after login
router.get('/dashboard', auth.ensureAuthenticated, loginController.dashboardGet);

// Logout
router.get('/logout', loginController.logout);

module.exports = router;