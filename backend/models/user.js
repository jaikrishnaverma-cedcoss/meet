const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        unique: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Assuming roles can be either 'admin' or 'user'
        default: 'user'
    },
    group: {
        type: [String], // Array of strings
        default: []
    },
    pic: {
        type: String,
        default: '/default_pic.png'
    }
});
userSchema.pre('save', function(next) {
  if (!this.userName) {
      // Generate userName by concatenating firstName and lastName
      this.userName = this.firstName.toLowerCase() + this.lastName.toLowerCase();
  }
  next();
});
const User = mongoose.model('User', userSchema)
module.exports = User;