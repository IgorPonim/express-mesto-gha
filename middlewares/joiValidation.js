const { celebrate, Joi } = require('celebrate');

const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!]))?/;

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(10),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(10),
    avatar: Joi.string().required().pattern(urlPattern),
  }),
});

// мега регулярка для валидации ссылок на аватар
const avatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(20),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(), //  пример валидации в интернете для mognoD
  }),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(15),
    about: Joi.string().required().min(2).max(15),
  }),
});

module.exports = {
  signUp,
  signIn,
  avatarValidate,
  createCardValidate,
  cardIdValidate,
  userIdValidate,
  userUpdateValidate,
};
