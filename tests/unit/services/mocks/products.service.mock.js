const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const wrongSizeProductBody = { name: 'Prod' };
const rightProductBody = { name: 'Produto1' };

const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };

const filteredProducts = [
  { id: 1, name: 'Martelo de Thor' },
];

const noMatch = [];

module.exports = {
  allProducts,
  wrongSizeProductBody,
  rightProductBody,
  productUpdateBody,
  filteredProducts,
  noMatch,
};