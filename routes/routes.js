const express = require('express')
const { userRoutes } = require('./userRoutes')
const routes = express.Router()

routes.use('/users', userRoutes)


exports.routes = routes