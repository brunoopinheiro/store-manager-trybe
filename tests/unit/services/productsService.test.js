const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const {
  allProducts,
  wrongSizeProductBody,
  rightProductBody,
  productUpdateBody,
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

  describe('Updating a product', function () {
    it('Should return an error when the id is not from a product', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const error = await productsService.updateProduct(99999, productUpdateBody);

      expect(error.type).to.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.equal('Product not found');
    });

    it('Should return an error if the Id is invalid', async function () {
      const result = await productsService.updateProduct('um', productUpdateBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Should return an error when the product name is too short', async function () {
      const result = await productsService.updateProduct(1, wrongSizeProductBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('Should update the product', async function () {
      sinon.stub(productsModel, 'updateById').resolves(true);
      sinon.stub(productsModel, 'getById').resolves({ id: 1, ...productUpdateBody });
      
      const product = await productsService.updateProduct(1, productUpdateBody);

      expect(product.type).to.be.equal(null);
      expect(product.message).to.be.deep.equal({
        id: 1,
        ...productUpdateBody,
      });
    });
  });

  describe('Deleting a product', function () {
    it('Should return an error when the id is not from a product', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const error = await productsService.deleteProduct(99999);

      expect(error.type).to.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.equal('Product not found');
    });

    it('Should return an error if the Id is invalid', async function () {
      const error = await productsService.deleteProduct('um', productUpdateBody);

      expect(error.type).to.equal('INVALID_VALUE');
      expect(error.message).to.equal('"id" must be a number');
    });

    it('Should succesfully delete a product', async function () {
      sinon.stub(productsModel, 'deleteById').resolves(true);

      const result = await productsService.deleteProduct(3);

      expect(result.type).to.be.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});