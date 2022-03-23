const express = require('express');

const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/user');
const { avatarValidate } = require('../middlewares/joiValidation');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me', updateUserInfo);

userRoutes.patch('/me/avatar', avatarValidate, updateAvatar);

exports.userRoutes = userRoutes;
