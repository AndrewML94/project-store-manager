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

module.exports = {
  createSale,
};