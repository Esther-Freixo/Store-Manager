const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesFromModel, salesIdFromModel } = require('../mocks/sales.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Sales CONTROLLERS:', function () {
  it('Verifica o retorno SUCCESSFUL da função findAll', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    sinon.stub(salesService, 'findAll').resolves({
      status: 'SUCCESSFUL',
      data: salesFromModel,
    });
  
    await salesController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Recuperando sala por id com sucesso', async function () {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'findById').resolves({
      status: 'SUCCESSFUL',
      data: salesIdFromModel,
    });

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesIdFromModel);
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

    sinon.stub(salesService, 'findById').resolves({
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});