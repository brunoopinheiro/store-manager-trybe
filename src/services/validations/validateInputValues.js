const { idSchema, addProductSchema, addSaleSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSale = (saleArray) => {
  let errorType = null;
  let errorMessage = '';

  saleArray.forEach((saleObj) => {
    const { error } = addSaleSchema.validate(saleObj);
  
    if (error) {
      errorType = error.message.includes('required') ? 'MISSING_FIELDS' : 'INVALID_VALUE';
      errorMessage = error.message;
    }
  });

  return { type: errorType, message: errorMessage };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSale,
};