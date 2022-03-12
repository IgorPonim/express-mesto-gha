const express = require('express')
const { getCards, addLike, dislikeCard, deleteCardById, createCard } = require('../controllers/cardControllers')
const cardRoutes = express.Router()

cardRoutes.get('/', getCards)

cardRoutes.get('/:cardId', deleteCardById)

cardRoutes.post('/', createCard)

cardRoutes.put('/:cardId/likes', addLike);

cardRoutes.delete('/:cardId/likes', dislikeCard);

exports.cardRoutes = cardRoutes