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

