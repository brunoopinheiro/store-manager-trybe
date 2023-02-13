const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const {
  allProducts,
  rightProductBody,
  productUpdateBody,
  productsUpdated,
} = require('./mocks/productsModel.mock');

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

  describe('Creating a new product', function () {
    it('Should create a new product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await productsModel.insert(rightProductBody);

      expect(result).to.equal(42);
    });
  });

  describe('Updating a product', function () {
    it('Should update an existing product', async function () {
      sinon.stub(connection, 'execute').resolves(productsUpdated);
      const productId = 1;

      const result = await productsModel.updateById(productId, productUpdateBody);

      expect(result[0].affectedRows).to.be.deep.equal(1);
      expect(result[0].changedRows).to.be.deep.equal(1);
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});