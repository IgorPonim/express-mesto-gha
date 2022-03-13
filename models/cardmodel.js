const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Empty"
  },
  link: {
    type: String,
    required: true,
    default: "https://i.pinimg.com/originals/36/19/92/3619926eebdff36483a5ce252efc2815.jpg"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  likes: {
    type: [mongoose.ObjectId],
    default: [],
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }

})

exports.Card = mongoose.model('card', cardSchema)