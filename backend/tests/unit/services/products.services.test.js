const { expect } = require('chai');
const sinon = require('sinon');
const { products, productId, newProductName, newProduct, resUptade } = require('../mocks/products.mock');
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

  it('Verifica a função createProduct com retorno CREATED ', async function () {
    sinon.stub(productsModel, 'createProduct').resolves(newProduct);
  
    const responseService = await productsService.createProduct(newProductName);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(newProduct);
  });

  it('Verifica a função updateProduct com sucesso ', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(resUptade);
  
    const responseService = await productsService.updateProduct(resUptade);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(resUptade);
  });

  it('Verifica a função updateProduct sem sucesso ', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
  
    const responseService = await productsService.updateProduct(resUptade);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
});