const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const productList = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productService.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;

  const { message } = await productService.searchProduct(q.toLowerCase());

  res.status(200).json(message);
};

module.exports = {
  productList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};