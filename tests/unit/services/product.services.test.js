const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts, invalidId, validId } = require('./mock/product.service.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});