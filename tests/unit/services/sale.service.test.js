const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { validSale, invalidSale, saleWithoutQuantity, returnSale, allSales } = require('./mock/sale.service.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Verificando o retorno das vendas', function () {
    it('Se está vindo todas as vendas pela rota "/sales"', async function () {
      sinon.stub(saleModel, 'findAll').resolves(allSales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales)
    });

    it('Se está vindo a venda correta ao buscar na rota "/:id" por um id válido', async function () {
      sinon.stub(saleModel, 'findById').resolves(allSales[2]);

      const result = await saleService.findById(2);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales[2]);
    });

    it('Se está vindo a mensagem de erro ao buscar na rota "/:id" por um id inválido', async function () {
      const result = await saleService.findById(7);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found')
    });
  });

  describe('Cadastro de uma venda', function () {
    it('Retorna o id de vendas vendidos caso esteja tudo certo', async function () {
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

  describe('Deletando uma venda', function () {
    it('Não retorna nada caso esteja tudo certo', async function () {
      sinon.stub(saleModel, 'deleteSale').resolves(1);

      const result = await saleService.deleteSale(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal('');
    });

    it('Retorna um erro ao passar um id inválido', async function () {
      const result = await saleService.deleteSale(7);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Sale not found')
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});