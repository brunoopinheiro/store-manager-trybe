const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

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

const rightProductBody = { name: 'Produto1' };

const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };

const productsUpdated = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 1,
    info: 'Rows matched: 1 Changed: 1 Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

module.exports = {
  allProducts,
  rightProductBody,
  productUpdateBody,
  productsUpdated,
  returnAfterDelete,
};