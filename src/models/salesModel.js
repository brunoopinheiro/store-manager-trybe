const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sales',
  );

  return camelize(result);
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
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

module.exports = {
  getAll,
  getById,
  insert,
};