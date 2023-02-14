const camelize = require('camelize');
const connection = require('./connection');
const createInsertArrays = require('../utils/createInsertArray');
const createUpdateArray = require('../utils/createUpdateArray');

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

const updateById = async (productId, dataToUpdate) => {
  const columns = createUpdateArray(dataToUpdate);

  const result = await connection.execute(
    `UPDATE products SET ${columns} WHERE id = ?`,
    [...Object.values(dataToUpdate), productId],
  );

  return result;
};

const deleteById = async (productId) => {
  const result = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );

  console.log(result);

  return result;
};

module.exports = { getAll, getById, insert, updateById, deleteById };