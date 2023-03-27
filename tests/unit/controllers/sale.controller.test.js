const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { productMock, newProductMock, invalidProductId } = require('./mock/sale.controller.mock');

chai.use(sinonChai);

describe('Teste de unidade do controller de vendas', function () {
  describe('Cadastrando uma nova venda', function () {
    it('Ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {};
      const req = { body: productMock };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'createSale').resolves({ type: null, message: newProductMock });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Ao enviar um id de produto que não exista deve retornar um erro', async function () {
      const res = {};
      const req = { invalidProductId };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'createSale')
        .resolves({ type: 'INVALID_VALUE', message: 'Product not found' });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});