const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await saleService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
};