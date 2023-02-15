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


const wrongSaleNotProductIdBody = [{ quantity: 1 }];
const wrongSaleNotQuantityBody = [{ productId:1 }];
const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];
const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];
const nonexistentProductIdBody = [{ productId: 9999, quantity: 1 }];
const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];

const allSales = [
  {
    saleId: 1,
    date: '2023-02-15 12:24:24',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-02-15 12:24:24',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-02-15 12:24:24',
    productId: 3,
    quantity: 15,
  },
  {
    saleId: 3,
    date: '2023-02-15 12:24:24',
    productId: 2,
    quantity: 5,
  },
  {
    saleId: 3,
    date: '2023-02-15 12:24:24',
    productId: 2,
    quantity: 5,
  },
];

const saleById = [
  {
    date: '2023-02-15 12:24:24',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-02-15 12:24:24',
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  saleCreatedResponse,
  correctSaleRequest,
  productsModelMockReturn,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  allSales,
  saleById,
};