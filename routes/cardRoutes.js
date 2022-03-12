const express = require('express')
const { getCards, deleteCardById, createCard } = require('../controllers/cardControllers')
const cardRoutes = express.Router()

cardRoutes.get('/', getCards)

cardRoutes.get('/:id', deleteCardById)

cardRoutes.post('/', createCard)

exports.cardRoutes = cardRoutes