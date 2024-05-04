const { expect } = require('chai');
const sinon = require('sinon');
const { salesFromModel, salesIdFromModel, reqSalesProd, resSalesProd } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('sales SERVICES:', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('Verifica a função findAll com retorno SUCCESSFUL ', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesFromModel);

    const responseService = await salesService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(salesFromModel);
  });

  it('Verifica a função findById com retorno SUCCESSFUL ', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesIdFromModel);

    const saleId = 1;
    const responseService = await salesService.findById(saleId);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(salesIdFromModel);
  });

  it('Verificando se não é possível listar uma sale que não existe', async function () {
    sinon.stub(salesModel, 'getById').resolves();

    const saleId = 888;
    const responseService = await salesService.findById(saleId);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Verifica o cadastro de uma nova sale com sucesso', async function () {
    sinon.stub(salesModel, 'createSale').resolves(resSalesProd);

    const responseService = await salesService.createSale(reqSalesProd);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(resSalesProd);
  });
});