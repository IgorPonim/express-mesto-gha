const express = require('express');

const {
  getCards,
  addLike,
  dislikeCard,
  deleteCardById,
  createCard,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);

cardRoutes.delete('/:cardId', deleteCardById);

cardRoutes.post('/', createCard);

cardRoutes.put('/:cardId/likes', addLike);

cardRoutes.delete('/:cardId/likes', dislikeCard);

exports.cardRoutes = cardRoutes;
