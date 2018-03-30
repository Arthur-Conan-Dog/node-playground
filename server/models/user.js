const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }