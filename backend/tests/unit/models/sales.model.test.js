const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesFromModel, salesIdFromModel, reqSalesProd, resSalesProd } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Sales MODEL:', function () {
  it('Recuperando todos os sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromModel]);
    
    const salesResponse = await salesModel.getAll();

    expect(salesResponse).to.be.an('array'); 
    expect(salesResponse).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando uma sale pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesIdFromModel]);
    
    const saleId = 1;
    const salesResponse = await salesModel.getById(saleId);

    expect(salesResponse).to.be.an('array'); 
    expect(salesResponse).to.be.deep.equal(salesIdFromModel);
  });

  it('Verificando se não é possível listar uma sale que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    
    const saleId = 888;
    const salesResponse = await salesModel.getById(saleId);

    expect(salesResponse).to.be.equal(null);
  });

  it('Verificando inserção de nova venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    
    const newSale = await salesModel.createSale(reqSalesProd);

    expect(newSale).to.be.an('object'); 
    expect(newSale).to.be.deep.equal(resSalesProd);
  });

  afterEach(function () {
    sinon.restore();
  });
});