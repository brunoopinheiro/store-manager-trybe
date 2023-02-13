const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

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

module.exports = { getAll, getById };