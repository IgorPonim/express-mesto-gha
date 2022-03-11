const { User } = require('../models/usermodel');
const USERS = require('./../users.json');

exports.getUsers = async (req, res) => {
  const users = await User.find({})
  res.send(users)
  }
exports.getUserById = async (req, res) => {
  const users = await User.findById(req.params.id)
  res.send(users)
}

exports.createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
}