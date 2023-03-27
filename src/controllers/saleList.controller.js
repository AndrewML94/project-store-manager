const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await saleService.createSale(itemsSold);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const saleList = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

module.exports = {
  createSale,
  saleList,
  getSale,
  deleteSale,
};