const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSales, saleById, returnAfterDelete } = require('./mocks/salesModel.mock');

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

  describe('Deleting a sale', function () {
    it('Should delete an existing sale', async function () {
      sinon.stub(connection, 'execute').resolves(returnAfterDelete);

      const result = await salesModel.deleteById(3);

      expect(result[0].affectedRows).to.be.deep.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});