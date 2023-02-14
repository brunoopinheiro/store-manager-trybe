const saleCreatedResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const correctSaleRequest = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const productsModelMockReturn = [
  { id: 1, name: 'Martelo de Thor' },
];

module.exports = {
  saleCreatedResponse,
  correctSaleRequest,
  productsModelMockReturn,
};