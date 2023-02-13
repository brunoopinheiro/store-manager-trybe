const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts } = require('./mocks/productsController.mock');

describe('Unit Tests for Products Controller', function () {
  describe('List all products', function () {
    it('Should return status 200 and the full list', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves({
        type: null,
        message: allProducts,
      });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Searching a product by Id', function () {
    it('Should return status 200 and the product when the product exists', async function () {
      const res = {};
      const req = { params: { id: 2 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({
        type: null,
        message: allProducts[1],
      });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[1]);
    });

    it('Should return an error if the id is not valid', async function () {
      const res = {};
      const req = { params: { id: 'um' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({
        type: 'INVALID_VALUE',
        message: '"id" must be a number',
      });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number'});
    });
    
    it('Should return an error if does not exist a product with the id', async function () {
      const res = {};
      const req = { params: { id: 2112 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});