const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );

  return product;
};

module.exports = {
  findAll,
  findById,
};