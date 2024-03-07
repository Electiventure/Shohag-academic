// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the 'User' schema
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'] 
  }
  });

// Plugin Passport-Local Mongoose to simplify username/password management
UserSchema.plugin(passportLocalMongoose);

// Create the 'User' model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;
