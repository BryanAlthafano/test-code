const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, 'Fullname is required'] },
    role: { type: String, required: [true, 'Role is required'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email address format'
      }
    },
    password: { type: String, required: [true, 'Password is required'] }
  },
  {
    collection: 'User',
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
