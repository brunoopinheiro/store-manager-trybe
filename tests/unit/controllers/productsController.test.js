const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  allProducts,
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  newProductMock,
  productUpdateBody,
  filteredProducts,
  noMatch,
} = require('./mocks/productsController.mock');

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

  describe('Creating a new product', function () {
    it('Should create a new product with valid data', async function () {
      const res = {};
      const req = {
        body: rightProductBody,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: null,
        message: newProductMock,
      });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Should return an error if the product name is too short', async function () {
      const res = {};
      const req = {
        body: wrongSizeProductBody,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: 'INVALID_VALUE',
        message: '"name" must be at least 5 characters long',
      });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" must be at least 5 characters long' });
    });

    it('Should return an error if the product does not have a name', async function () {
      const res = {};
      const req = {
        body: wrongProductBody,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: 'MISSING_FIELDS',
        message: '"name" is required',
      });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('Updating a product', function () {
    it('Should update an existing product', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: productUpdateBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves({ type: null, message: { id: 1, ...productUpdateBody } });
      
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        ...productUpdateBody,
      });
    });

    it('Should return an error if the Id is not valid', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: productUpdateBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Should return an error if the product does not have a name', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: wrongProductBody,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves({
        type: 'MISSING_FIELDS',
        message: '"name" is required',
      });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('Deleting a product', function () {
    it('Should delete a product by its id', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct').resolves({
        type: null,
      });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Should return an error if the id is not valid', async function () {
      const res = {};
      const req = { params: { id: 9999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Searching products by name', function () {
    it('Should return status 200 and the filtered list of products', async function () {
      const res = {};
      const req = { query: { q: 'Martelo' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getByName').resolves({
        type: null,
        message: filteredProducts,
      });

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(filteredProducts);
    });

    it('Should return status 200 and the full list when the query is empty', async function () {
      const res = {};
      const req = { query: { q: '' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getByName').resolves({
        type: null,
        message: allProducts,
      });

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Should return status 200 and an empty array when there is no match', async function () {
      const res = {};
      const req = { query: { q: 'Trajestilador' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getByName').resolves({
        type: null,
        message: noMatch,
      });

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(noMatch);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});