const { nameProduct } = require('./schemas');

const validateName = (name) => {
  const { error } = nameProduct.validate(name);

  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateName,
};