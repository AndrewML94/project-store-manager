const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { newProduct } = require('./mock/sale.model.mock');

describe('Teste de unidade do model de vendas', function () {
  it('Cadastrando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const id = await saleModel.insertSale();
    const result = await saleModel.insertSaleProduct(newProduct);

    expect(id).to.equal(5);
    expect(result).to.equal();
  });

  afterEach(function () {
    sinon.restore();
  });
});