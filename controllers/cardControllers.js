const { Card } = require('../models/cardmodel');


exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};

exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
};

exports.createCard = (req, res) => {
  const ownerId = req.user._id
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
}


exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Something broke!' }))
};


exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Something broke!' }))
};