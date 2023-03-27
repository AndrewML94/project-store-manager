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

module.exports = {
  insertSale,
  insertSaleProduct,
  findAll,
  findById,
};