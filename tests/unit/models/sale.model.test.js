const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allSales, newSale, saleById } = require('./mock/sale.model.mock');

describe('Teste de unidade do model de vendas', function () {
  it('Recuperando a lista total de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await saleModel.findAll();

    expect(result).to.be.deep.equal(allSales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await saleModel.findById(2);

    expect(result).to.be.deep.equal(saleById);
  });

  it('Cadastrando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const id = await saleModel.insertSale();
    const result = await saleModel.insertSaleProduct(newSale);

    expect(id).to.equal(5);
    expect(result).to.equal();
  });

  it('Deletando uma venda já existente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await saleModel.deleteSale(1);

    expect(result).to.equal();
  });

  afterEach(function () {
    sinon.restore();
  });
});