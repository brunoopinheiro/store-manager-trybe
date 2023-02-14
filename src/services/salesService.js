const { productsModel, salesModel, salesProductModel } = require('../models');
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
  if (!validProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product Not Found' };

  // Cadastra nova sale
  const saleId = await salesModel.insert();
  // usa saleId para criar array de inserções na tabela relacional
  const salesObjectArray = saleArray.map((saleProduct) => ({ saleId, ...saleProduct }));
  // insere no banco relacional
  salesObjectArray.forEach(async (saleObj) => {
    await salesProductModel.insert(saleObj);
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