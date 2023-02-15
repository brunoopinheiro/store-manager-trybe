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

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const returnAfterDelete = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

module.exports = {
  saleCreateResponse,
  allSales,
  saleById,
  returnAfterDelete,
};