const { User } = require('../models/usermodel');

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};

exports.createUser = (req, res) => {

  User.create(req.body)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))

}

exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};