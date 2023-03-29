const camelize = require('camelize');
const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sale_id = id
    ORDER BY sp.sale_id, sp.product_id`,
  );

  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sale_id = id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id`, [saleId],
  );

  return camelize(sale);
};

const deleteSale = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
};

const updateSale = async (productId, quantity, id) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [quantity, productId, id],
  );
};

const findIdSale = async (saleId) => {
  const [id] = await connection.execute(
    'SELECT id FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );

  return id;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  findAll,
  findById,
  deleteSale,
  updateSale,
  findIdSale,
};