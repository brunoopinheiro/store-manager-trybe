const { productsModel } = require('../models');
const { validateId } = require('./validations/validateInputValues');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};