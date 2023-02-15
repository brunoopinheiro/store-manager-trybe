const camelize = require('camelize');
const connection = require('./connection');
const createInsertArrays = require('../utils/createInsertArray');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products',
  );

  return camelize(result);
};

const insert = async (saleObject) => {
  const [columns, placeholders] = createInsertArrays(saleObject);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`,
    [...Object.values(saleObject)],
  );

  return insertId;
};

const deleteBySaleId = async (saleId) => {
  const result = await connection.execute(
    'DELETE FROM sales_products WHERE id = ?',
    [saleId],
  );

  return result;
};

module.exports = {
  getAll,
  insert,
  deleteBySaleId,
};