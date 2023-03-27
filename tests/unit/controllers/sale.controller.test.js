const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { productMock, newProductMock, invalidProductId, allSales, saleById } = require('./mock/sale.controller.mock');

chai.use(sinonChai);

describe('Teste de unidade do controller de vendas', function () {
  describe('Listando todos as vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: null, message: allSales });

      await saleController.saleList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Deve retornar um erro se o type for !== de "null"', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await saleController.saleList(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });

  describe('Listando uma venda pelo id da rota "/sales/:id"', function () {
    it('Deve retornar o status 200 e a venda', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: null, message: saleById });

      await saleController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });

    it('Deve retornar um erro se o type for !== de "null"', async function () {
      const res = {};
      const req = { params: { id: 7 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await saleController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

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