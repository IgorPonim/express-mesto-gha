const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name: {
  type: String,
  required: true,
  minlength: 2
}

})

exports.User = mongoose.model('user', userSchema)