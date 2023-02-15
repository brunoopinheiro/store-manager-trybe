const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const salesArray = req.body;
  const { type, message } = await salesService.createSale(salesArray);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { message } = await salesService.getAll();

  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const salesArray = req.body;

  const { type, message } = await salesService.updateSale(id, salesArray);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSale,
  listSales,
  getSale,
  deleteSale,
  updateSale,
};