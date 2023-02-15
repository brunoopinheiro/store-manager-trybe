const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSales, saleById } = require('./mocks/salesModel.mock');

describe('Unit Tests: Sales Model', function () {
  describe('Crete new sale', function () {
    it('Should be able to create a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await salesModel.insert();

      expect(result).to.be.deep.equal(42);
    });
  });

  describe('Get sales list', function () {
    it('Should be able to list all sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSales])

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(allSales);
    });

    it('Should return the correct sale by its id', async function () {
      sinon.stub(connection, 'execute').resolves([saleById]);

      const result = await salesModel.getById(1);

      expect(result).to.be.deep.equal(saleById);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});