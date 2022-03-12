const { Card  } = require('../models/cardmodel');


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

  Card.create(req.body)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Something broke!' }))
}