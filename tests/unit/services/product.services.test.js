const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts, invalidId, validId, invalidName } = require('./mock/product.service.mock');

describe('Teste de unidade do service de produtos', function () {
  describe('Verificando o retorno dos produtos', function () {
    it('Se está vindo todos os produtos pela rota "/products"', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);

      const result = await productService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts)
    });

    it('Se está vindo o produto correto ao buscar na rota "/:id" por um id válido', async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);

      const result = await productService.findById(validId);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('Se está vindo a mensagem de erro ao buscar na rota "/:id" por um id inválido', async function () {
      const result = await productService.findById(invalidId);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found')
    });
  });

  describe('Cadastro de um produto', function () {
    it('Retorna o nome do produto e id caso esteja tudo certo', async function () {
      sinon.stub(productModel, 'insert').resolves('Casa de madeira');
      sinon.stub(productModel, 'findById').resolves(5);

      const result = await productService.createProduct('Casa de madeira');
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(5)
    });

    it('Retorna um erro ao passar um nome inválido', async function () {
      const result = await productService.createProduct(invalidName);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long')
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});