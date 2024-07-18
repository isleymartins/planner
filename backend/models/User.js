const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: Date, required: true },
  password: { type: Date, required: true }
});

const User = mongoose.model('TUser', user);

module.exports = {
  User,
  userSchema,
};
