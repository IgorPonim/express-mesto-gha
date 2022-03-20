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

userRoutes.get('/:userId', getUserById);

// userRoutes.post('/', createUser);

userRoutes.patch('/me', updateUserInfo);

userRoutes.patch('/me/avatar', updateAvatar);

userRoutes.get('/users/me', getCurrentUser);

exports.userRoutes = userRoutes;
