const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const {
  allProducts,
  wrongSizeProductBody,
  rightProductBody,
} = require('./mocks/products.service.mock');

describe('Unit Tests for Products Service', function () {
  describe('Getting Products List', function () {
    it('Should return the full list of products ordered by ID', async function () {
      sinon.stub(productsModel, 'getAll').resolves(allProducts);

      const result = await productsService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Getting a Product by ID', function () {
    it('Should return an error if the Id is invalid', async function () {
      const result = await productsService.getById('um');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Should return an error if the Id does not exist', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await productsService.getById(2112);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Should return the correct product by its ID', async function () {
      sinon.stub(productsModel, 'getById').resolves(allProducts[1]);

      const result = await productsService.getById(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[1]);
    });
  });

  describe('Creating a new product', function () {
    it('Should return an error when the product name is too short', async function () {
      const result = await productsService.createProduct(wrongSizeProductBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('Should return the id of the new product', async function () {
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'getById').resolves(allProducts[0]);

      const result = await productsService.createProduct(rightProductBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});