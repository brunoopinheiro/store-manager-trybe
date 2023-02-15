const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allEntries, saleObject, returnAfterDelete } = require('./mocks/salesProductsModel.mock');

describe('Unit Tests: Sales_Products Model', function () {
  describe('List Sales_Products entries', function () {
    it('Should list all entries', async function () {
      sinon.stub(connection, 'execute').resolves([allEntries]);

      const result = await salesProductsModel.getAll();

      expect(result).to.be.deep.equal(allEntries);
    });
  });

  describe('Creating new entries', function () {
    it('Should create a new entry', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

      const result = await salesProductsModel.insert(saleObject);

      expect(result).to.be.equal(10);
    });
  });

  describe('Deleting entries', function () {
    it('Should delete an existing set of entries', async function () {
      sinon.stub(connection, 'execute').resolves(returnAfterDelete);

      const result = await salesProductsModel.deleteBySaleId(1);

      expect(result[0].affectedRows).to.be.deep.equal(2);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});