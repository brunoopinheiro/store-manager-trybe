const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSaleSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1).required(),
});

const saleRequisitionSchema = Joi.array().items(addSaleSchema).min(1).required();

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
  saleRequisitionSchema,
};