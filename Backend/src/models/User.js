const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  address: { type: String },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true },
  googleId: { type: String },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;