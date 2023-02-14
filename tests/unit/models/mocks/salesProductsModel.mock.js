const correctSaleRequest = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const allEntries = [
  { saleId: 1, productId: 1, quantity: 5 },
  { saleId: 1, productId: 2, quantity: 10 },
  { saleId: 2, productId: 3, quantity: 15 },
];

const saleObject = {
  saleId: 3,
  productId: 2,
  quantity: 6,
};

module.exports = {
  correctSaleRequest,
  allEntries,
  saleObject,
};