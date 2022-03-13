const express = require('express')
const { getUsers, getUserById, updateAvatar, updateUserInfo, createUser } = require('../controllers/userControllers')
const userRoutes = express.Router()

userRoutes.get('/', getUsers)

userRoutes.get('/:userId', getUserById)

userRoutes.post('/', createUser)

userRoutes.patch('/me', updateUserInfo)

userRoutes.patch('/me/avatar', updateAvatar)

exports.userRoutes = userRoutes