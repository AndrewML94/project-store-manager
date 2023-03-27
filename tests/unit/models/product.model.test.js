const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts, newProduct } = require('./mock/product.model.mock');

describe('Teste de unidade do model de produtos', function () {
  it('Recuperando a lista total de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await productModel.insert(newProduct);

    expect(result).to.equal(5);
  });

  it('Atualizando um produto já existente', async function () {
    sinon.stub(connection, 'execute').resolves([{ name: 'casa de madeira' }]);

    const result = await productModel.updateProduct(1, 'casa de madeira');

    expect(result).to.equal();
  });

  afterEach(function () {
    sinon.restore();
  });
});