const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Дейенеррис"
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Мать драконов"
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://images11.cosmopolitan.ru/upload/img_cache/f3b/f3bcb69aafdc9eb6349a2102a399ada0_cropped_1332x1050.jpg'
  }

})

exports.User = mongoose.model('user', userSchema)