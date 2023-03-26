const connection = require('./connection');
const camelize = require('camelize');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products'
  )

  return camelize(products);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );

  return camelize(product);
}

module.exports = {
  findAll,
  findById,
};