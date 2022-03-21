const { Card } = require('../models/cardmodel');
const ForbiddenError = require('../errors/forbiddenError');

exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

exports.deleteCardById = (req, res, next) => {

  Card.findByIdAndRemove(req.params.cardId)

    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (card.owner.valueOf() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалять чужие карточки!'));
      }

      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new badRequestError('Невалидный id ');
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id ' });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};
