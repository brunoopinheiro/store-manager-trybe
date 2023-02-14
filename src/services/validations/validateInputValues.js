const { idSchema, addProductSchema, saleRequisitionSchema } = require('./schema');

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
  const { error } = saleRequisitionSchema.validate(saleArray);

  if (error) return { type: error.type, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSale,
};