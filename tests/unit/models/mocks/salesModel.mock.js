const allSales = [
  { id: 1, date: '2023-02-14 14:17:27' },
  { id: 2, date: '2023-02-14 14:17:27' },
];

const correctSaleRequest = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];
const wrongSaleNotProductIdBody = [{ quantity: 1 }];
const wrongSaleNotQuantityBody = [{ productId:1 }];
const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];
const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];
const nonexistentProductIdBody = [{ productId: 9999, quantity: 1 }];
const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];


const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

module.exports = {
  correctSaleRequest,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  saleCreateResponse,
  allSales,
};