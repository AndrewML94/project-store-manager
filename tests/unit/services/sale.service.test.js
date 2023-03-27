const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { validSale, invalidSale, saleWithoutQuantity, returnSale } = require('./mock/sale.service.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Cadastro de uma venda', function () {
    it('Retorna o id de produtos vendidos caso esteja tudo certo', async function () {
      sinon.stub(saleModel, 'insertSaleProduct').resolves(5, 1, 2);
      sinon.stub(saleModel, 'insertSale').resolves(5);

      const result = await saleService.createSale(validSale);

      expect(result.message).to.deep.equal(returnSale);
    });

    it('Retorna um erro ao passar uma quantidade menor ou igual a zero', async function () {
      const result = await saleService.createSale(invalidSale);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Retorna um erro ao não informar o campo quantity', async function () {
      const result = await saleService.createSale(saleWithoutQuantity);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});