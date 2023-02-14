const { productsModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validateInputValues');

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

const getByName = async (productName) => {
  const product = await productsModel.getByName(productName);
  return { type: null, message: product };
};

// product should be an object { name: 'string 5+ long' }
const createProduct = async (product) => {
  const error = validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insert(product);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, productData) => {
  let error = validateId(id);
  if (error.type) return error;

  error = validateNewProduct(productData);
  if (error.type) return error;

  const oldProduct = await productsModel.getById(id);
  if (!oldProduct) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.updateById(id, productData);
  const result = await productsModel.getById(id);
  return { type: null, message: result };
};

const deleteProduct = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const oldProduct = await productsModel.getById(productId);
  if (!oldProduct) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.deleteById(productId);
  return { type: null };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getByName,
};