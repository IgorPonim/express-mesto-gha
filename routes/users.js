const express = require('express');

const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUserInfo,
  createUser,
  getCurrentUser
} = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me', updateUserInfo);

userRoutes.patch('/me/avatar', updateAvatar);



exports.userRoutes = userRoutes;
