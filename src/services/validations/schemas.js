const Joi = require('joi');

const nameProduct = Joi.string().min(5).required();

module.exports = {
  nameProduct,
}