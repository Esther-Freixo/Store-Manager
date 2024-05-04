const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { products, productId, newProductName, newProduct, resUptade } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Products CONTROLLERS:', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('Verifica o retorno SUCCESSFUL da função findAll', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'findAll').resolves({
      status: 'SUCCESSFUL',
      data: products,
    });

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Verifica o retorno SUCCESSFUL da função findById', async function () {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'findById').resolves({
      status: 'SUCCESSFUL',
      data: productId,
    });

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productId);
  });

  it('Verifica o retorno NOT_FOUND da função findById', async function () {
    const req = {
      params: {
        id: 888,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'findById').resolves({
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    });

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Verifica o retorno CREATED da função createProduct', async function () {
    const req = {
      body: {
        name: newProductName,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'createProduct').resolves({
      status: 'CREATED',
      data: newProduct,
    });

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Verifica o retorno SUCCESSFUL da função updateProduct', async function () {
    const req = {
      params: {
        id: 1,
      },
      body:{
        name: 'Martelo do Batman'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'updateProduct').resolves({
      status: 'SUCCESSFUL',
      data: resUptade,
    });

    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(resUptade);
  });

  it('Verifica o retorno sem sucesso da função updateProduct', async function () {
    const req = {
      params: {
        id: 888,
      },
      body:{
        name: 'teste'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };

    sinon.stub(productsService, 'updateProduct').resolves({
      status: 'INVALID_VALUE',
      data: { message: 'Product not updated' },
    });

    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: 'Product not updated' });
  });
});