// Endpoint para listar produtos (/products) e (/products/:id)
// Atraves de "/products" todos os produtos devem ser retornados
// Atraves de "/products/:id" apenas o produto com id presente na URL deve ser retornado
// Resultado nas listagens deve ser ORDENADO de forma crescente por ID
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/productsModel.mock');

describe('Unit Tests for Products Model', function () {
  describe('Getting Products List', function () {
    it('Should return the correct product list, ordered by ID', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(allProducts);
    });

    it('Should return the correct product by Id', async function () {
      sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);

      const result = await productsModel.getById(2);

      expect(result).to.be.deep.equal(allProducts[1]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});