const camelize = require('camelize');
const connection = require('./connection');
const createInsertArrays = require('../utils/createInsertArray');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );

  return camelize(result);
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return camelize(product);
};

const insert = async (product) => {
  const [columns, placeholders] = createInsertArrays(product);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

module.exports = { getAll, getById, insert };