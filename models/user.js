//models\User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the 'User' schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  }
});

// Plugin Passport-Local Mongoose with the 'usernameField' option
UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

// Create the 'User' model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;
