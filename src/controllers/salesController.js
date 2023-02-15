const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const salesArray = req.body;
  const { type, message } = await salesService.createSale(salesArray);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};