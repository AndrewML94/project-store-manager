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

const insert = async (product) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [product]);
  
  return insertId;
};

const updateProduct = async (productId, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productId],
  );
};

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProduct,
};