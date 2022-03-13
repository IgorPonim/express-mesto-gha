const { Card } = require('../models/cardmodel');


exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};

exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));

};




exports.createCard = (req, res) => {
  const ownerId = req.user._id
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then(card => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
}


exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};


exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию.', ...err }));
};