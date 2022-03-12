const express = require('express')
const { cardRoutes } = require('./cardRoutes')
const { userRoutes } = require('./userRoutes')
const routes = express.Router()

routes.use('/users', userRoutes)
routes.use('/cards', cardRoutes)


exports.routes = routes