const { User } = require('../models/usermodel');

exports.getUsers = (req, res) => {
  User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  })
  .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};

exports.createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));

}

exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  })
  .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  })
  .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};