const { saleModel, productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSale = async (sales) => {
  const error = schema.validateQuantity(sales);
  
  if (error.type) return error;

  const productDb = await Promise
    .all(sales.map((elem) => productModel.findById(elem.productId)));
  
  const verifyUndefinedProduct = productDb.some((elem) => elem === undefined);

  if (verifyUndefinedProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const id = await saleModel.insertSale();

  await Promise.all(sales
    .map((elem) => saleModel
    .insertSaleProduct(id, elem.productId, elem.quantity)));

  return { message: { id, itemsSold: sales } };
};

const findAll = async () => {
  const sales = await saleModel.findAll();

  return { type: null, message: sales };
};

const findById = async (productId) => {
  const sale = await saleModel.findById(productId);

  if (sale.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const sale = await saleModel.findById(saleId);

  if (sale.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  await saleModel.deleteSale(saleId);

  return { type: null, message: '' };
};

const updateSale = async (id, sales) => {
  const error = schema.validateQuantity(sales);

  if (error.type) return error;
  
  const productDb = await Promise
    .all(sales.map((elem) => productModel.findById(elem.productId)));
  const verifyUndefinedProduct = productDb.some((elem) => elem === undefined);
  const [verifyId] = await saleModel.findIdSale(id);

  if (verifyUndefinedProduct) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  if (verifyId === undefined) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  }

  await Promise.all(sales
    .map((elem) => saleModel
    .updateSale(elem.productId, elem.quantity, id)));

  return { message: { saleId: id, itemsUpdated: sales } };
};

module.exports = {
  createSale,
  findAll,
  findById,
  deleteSale,
  updateSale,
};