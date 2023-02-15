const { validateSale } = require('../services/validations/validateInputValues');
const errorMap = require('../utils/errorMap');

const validateSaleArray = (req, res, next) => {
  const salesArray = req.body;
  const error = validateSale(salesArray);
  if (error.type) {
    return res.status(errorMap.mapError(error.type)).json({ message: error.message });
  }

  return next();
};

module.exports = validateSaleArray;