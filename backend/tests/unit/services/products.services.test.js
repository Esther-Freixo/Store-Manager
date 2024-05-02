const { expect } = require('chai');
const sinon = require('sinon');
const { products, productId } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('Products SERVICES:', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('Verifica a função findAll com retorno SUCCESSFUL ', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const responseService = await productsService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(products);
  });

  it('Verifica a função findById com retorno SUCCESSFUL ', async function () {
    sinon.stub(productsModel, 'getById').resolves(productId);
  
    const responseService = await productsService.findById(1);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productId);
  });

  it('Verifica a função findById com retorno NOT_FOUND ', async function () {
    sinon.stub(productsModel, 'getById').resolves(null);
  
    const responseService = await productsService.findById(888);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' }); 
  });
});