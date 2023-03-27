const validateproductId = (req, res, next) => {
  const array = req.body;

  const productId = array.every((elem) => Object.keys(elem).includes('productId'));

  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateQuantity = (req, res, next) => {
  const array = req.body;

  const quantity = array.every((elem) => Object.keys(elem).includes('quantity'));

  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};

module.exports = {
  validateproductId,
  validateQuantity,
};