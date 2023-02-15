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
  // Test
  return {
    type: null,
    message: {
      id: saleId,
      itemsSold: saleArray,
    },
  };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length !== 0) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const deleteSale = async (saleId) => {
  const oldSaleList = await salesModel.getById(saleId);
  if (oldSaleList.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModel.deleteById(saleId);
  return { type: null };
};

const updateSale = async (saleId, saleArray) => { 
  const error = await getById(saleId);
  if (error.type) {
    return error;
  }

  const validProducts = await validateProducts(saleArray);
  if (!validProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  await salesProductsModel.deleteBySaleId(saleId);
  saleArray.forEach(async (saleObj) => {
    await salesProductsModel.insert({ saleId, ...saleObj });
  });

  return {
    type: null,
    message: {
      saleId,
      itemsUpdated: saleArray,
    },
  };
};

module.exports = {
  createSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};