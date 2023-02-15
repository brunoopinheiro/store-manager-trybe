const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sales.date, sp.product_id, sp.quantity 
    FROM sales INNER JOIN sales_products AS sp
    ON sales.id = sp.sale_id`,
  );

  return camelize(result);
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT sales.date, sp.product_id, sp.quantity 
    FROM sales INNER JOIN sales_products AS sp
    ON sales.id = sp.sale_id
    WHERE sales.id = ?`,
    [saleId],
  );

  return camelize(sale);
};

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  return insertId;
};

const deleteById = async (saleId) => {
  const result = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [saleId],
  );

  return result;
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteById,
};