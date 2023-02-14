const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');

const { correctSaleRequest, saleCreatedResponse, productsModelMockReturn } = require('./mocks/salesService.mock');

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
  });

  afterEach(function () {
    sinon.restore();
  });
});