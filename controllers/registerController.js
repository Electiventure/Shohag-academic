//controllers\registerController.js
const User = require('../models/User');

const registerGet = (req, res) => {
  res.render('register');
};

const registerPost = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).send('Username is already taken');
    }

    const user = new User({ username: req.body.username }); 
    await user.setPassword(req.body.password);
    await user.save();

    res.redirect('/users/login');
} catch (error) {
    console.error('Error in user registration:', error);
    console.error(error.stack);  // Log the stack trace

    if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).send('Duplicate key error: Username is already taken');
    }

    res.status(500).send('Internal Server Error');
}
};

module.exports = {
  registerGet,
  registerPost
};
