const { productsModel, salesModel, salesProductsModel } = require('../models');
const { validateSale } = require('./validations/validateInputValues');

const validateProducts = async (saleArray) => {
  const promises = saleArray.map(async (sale) => {
    const product = await productsModel.getById(sale.productId);
    if (product) return true;
    return false;
  });

  const productsArray = await Promise.all(promises);

  return productsArray.every((el) => el === true);
};

const createSale = async (saleArray) => {
  const error = validateSale(saleArray);
  if (error.type) return error;

  const validProducts = await validateProducts(saleArray);
  if (!validProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const saleId = await salesModel.insert();
  saleArray.forEach(async (saleObj) => {
    await salesProductsModel.insert({ saleId, ...saleObj });
  });

  return {
    type: null,
    message: {
      id: saleId,
      itemsSold: saleArray,
    },
  };
};

module.exports = {
  createSale,
};