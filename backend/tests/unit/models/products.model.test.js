const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productId, productIdFromModel } = require('../mocks/products.mock');

describe('Products MODEL:', function () {
  it('Recuperando todos os products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productsFromDB]]);
    
    const products = await productsModel.getAll();

    expect(products).to.be.an('array'); 
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recuperando um produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productId]]);
    
    const product = await productsModel.getById(1);

    expect(product).to.be.deep.equal(productIdFromModel);
  });

  it('Verificando se não é possível listar um produto que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    
    const products = await productsModel.getById(888);

    expect(products).to.be.null;
  });

  afterEach(function () {
    sinon.restore();
  });
});