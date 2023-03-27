const { nameProduct } = require('./schemas');

const validateName = (name) => {
  const { error } = nameProduct.validate(name);

  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

const validateQuantity = (quantityParam) => {
  const validateQuantityParam = quantityParam.every((elem) => elem.quantity > 0);

  if (!validateQuantityParam) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateName,
  validateQuantity,
};