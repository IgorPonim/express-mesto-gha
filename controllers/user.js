const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/usermodel');
const DuplicationError = require('../errors/duplicationError');
const AuthError = require('../errors/authError');
const NotFoundError = require('../errors/notFoundError');
const badRequestError = require('../errors/badRequestError')

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        return Promise.reject(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        return Promise.reject(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        return Promise.reject(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректные данные ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};



exports.createUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => { if (user) throw new DuplicationError(` Пользователь с ${req.body.email} уже зарегистрирован.`) })
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      name: req.body.name,
      avatar: req.body.avatar,
      about: req.body.about,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new badRequestError('Неверные данные');
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      return Promise.reject(new NotFoundError('Пользователь не найден.'));
    }

    // возвращаем пользователя, если он есть
    return res.status(200).send(user);
  }).catch((err) => {
    next(err);
  });
};