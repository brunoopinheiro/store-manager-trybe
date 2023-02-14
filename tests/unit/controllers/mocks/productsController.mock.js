const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const filteredProducts = [
  { id: 1, name: 'Martelo de Thor' },
];

const noMatch = [];

const wrongProductBody = {};
const wrongSizeProductBody = { name: 'Prod' };
const rightProductBody = { name: 'Produto1' };
const newProductMock = { id: 4, name: 'Produto1' };

const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };

module.exports = {
  allProducts,
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  newProductMock,
  productUpdateBody,
  filteredProducts,
  noMatch,
};