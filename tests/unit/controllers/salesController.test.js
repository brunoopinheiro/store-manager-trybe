const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  saleCreatedResponse,
  correctSaleRequest,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
} = require('./mocks/salesController.mock');

describe('Unit Tests: Sales Controller', function () {
  describe('Creating a new sale', function () {
    it('Should create a new sale', async function () {
      const res = {};
      const req = { body: correctSaleRequest };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: null,
        message: saleCreatedResponse,
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreatedResponse);
    });

    it('Should return status 400 when the productId is missing', async function () {
      const res = {};
      const req = { body: wrongSaleNotProductIdBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'MISSING_FIELDS',
        message: '"productId" is required'
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Should return status 400 when the quantity is missing', async function () {
      const res = {};
      const req = { body: wrongSaleNotQuantityBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'MISSING_FIELDS',
        message: '"quantity" is required',
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Should return status 422 when the quantity is not a valid integer', async function () {
      const res = {};
      const req = { body: wrongZeroQuantityBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'INVALID_VALUE',
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Should return status 422 when the quantity is not a valid integer', async function () {
      const res = {};
      const req = { body: wrongZeroNegativeBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'INVALID_VALUE',
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Should return status 404 when the productId does not exist', async function () {
      const res = {};
      const req = { body: nonexistentProductIdBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Should return status 404 when some productId does not exist', async function () {
      const res = {};
      const req = { body: nonexistentProductIdBody2 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});