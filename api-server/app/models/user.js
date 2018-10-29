const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = {
  firstName: String,
  lastName: String,
  googleId: Number,
  userSince: Date,
  lastLogin: Date
}

module.exports = mongoose.model('User', UserSchema)
