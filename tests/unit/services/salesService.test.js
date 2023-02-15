const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');

const {
  correctSaleRequest,
  saleCreatedResponse,
  productsModelMockReturn,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  allSales,
  saleById,
} = require('./mocks/salesService.mock');

describe('Unit Tests: Sales Service', function () {
  describe('Create a new sale', function () {
    it('Should create a new sale', async function () {
      sinon.stub(salesModel, 'insert').resolves(3);
      sinon.stub(salesProductsModel, 'insert')
        .onFirstCall()
        .resolves(1)
        .onSecondCall()
        .resolves(2);
      sinon.stub(productsModel, 'getById')
        .onFirstCall()
        .resolves(productsModelMockReturn)
        .onSecondCall()
        .resolves(productsModelMockReturn);

      const result = await salesService.createSale(correctSaleRequest);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleCreatedResponse);
    });

    it('Should return an error if the product is not valid', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await salesService.createSale(nonexistentProductIdBody);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('Should return an error if some product is not valid', async function () {
      sinon.stub(productsModel, 'getById')
        .onFirstCall().resolves(productsModelMockReturn)
        .onSecondCall().resolves(undefined);
      
      const result = await salesService.createSale(nonexistentProductIdBody2);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
      
    });

    it('Should return an error if the productId is missing', async function () {
      const result = await salesService.createSale(wrongSaleNotProductIdBody);

      expect(result.type).to.equal('MISSING_FIELDS');
      expect(result.message).to.equal('"productId" is required');
    });

    it('Should return an error if the quantity is missing', async function () {
      const result = await salesService.createSale(wrongSaleNotQuantityBody);

      expect(result.type).to.equal('MISSING_FIELDS');
      expect(result.message).to.equal('"quantity" is required');
    });

    it('Should return an error if the quantity is zero or lesser', async function () {
      const result = await salesService.createSale(wrongZeroQuantityBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('Should return an error if the quentity is a negative integer', async function () {
      const result = await salesService.createSale(wrongZeroNegativeBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
  });

  describe('Listing all sales', function () {
    it('Should list the full list of sales', async function () {
      sinon.stub(salesModel, 'getAll').resolves(allSales);

      const result = await salesService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allSales);
    });
  });

  describe('Listing sales by id', function () {
    it('Should return the list of sales', async function () {
      sinon.stub(salesModel, 'getById').resolves(saleById);

      const result = await salesService.getById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleById);
    });

    it('Should return an error if the id does not exist', async function () {
      sinon.stub(salesModel, 'getById').resolves(undefined);

      const result = await salesService.getById(2112);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});