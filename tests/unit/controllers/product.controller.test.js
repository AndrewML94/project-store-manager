const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, product, productMock, newProductMock, updateProductMock } = require('./mock/product.controller.mock');

chai.use(sinonChai);

describe('Teste de unidade do controller de produtos', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: null, message: allProducts });

      await productController.productList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Deve retornar um erro se o type for !== de "null"', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.productList(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });

  describe('Listando um produto pelo id da rota "/product/:id"', function () {
    it('Deve retornar o status 200 e o produto', async function () {
      const res = {};
      const req = { params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({ type: null, message: product });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });

    it('Deve retornar um erro se o type for !== de "null"', async function () {
      const res = {};
      const req = { params: { id: 7 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('Ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {};
      const req = { body: productMock };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct').resolves({ type: null, message: newProductMock });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Ao enviar um nome com menos de 5 caracteres retorna um erro', async function () {
      const res = {};
      const req = { body: { name: 'casa' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Atualizando um produto', function () {
    it('Ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Casa de madeira' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct').resolves({ type: null, message: updateProductMock });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateProductMock);
    });

    it('Ao enviar um nome com menos de 5 caracteres retorna um erro', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'casa' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Deletando um produto', function () {
    it('Ao informar um id válido deve deletar com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct').resolves({ type: null, message: '' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Ao enviar um id de produto inexistente apresenta um erro', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct')
        .resolves({ type: 'INVALID_VALUE', message: 'Product not found' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Pesquisando um produto pelo nome', function () {
    it('Ao informar um nome válido deve buscar com sucesso', async function () {
      const res = {};
      const req = { query: { q: 'martelo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'searchProduct').resolves({ type: null, message: [{ id: 1, name: 'Martelo de Thor' }] });

      await productController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([{ id: 1, name: 'Martelo de Thor' }]);
    });

    it('Ao enviar um nome de produto inexistente apresenta um array vazio', async function () {
      const res = {};
      const req = { query: { q: 'martelo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'searchProduct')
        .resolves({ type: null, message: [] });

      await productController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });


  afterEach(function () {
    sinon.restore();
  });
});