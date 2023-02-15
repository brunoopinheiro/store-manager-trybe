const allSales = [
  { id: 1, date: '2023-02-14 14:17:27' },
  { id: 2, date: '2023-02-14 14:17:27' },
];

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

module.exports = {
  saleCreateResponse,
  allSales,
};