const { expect } = require('chai');
const sinon = require('sinon');
const { validateSaleItems } = require('../../../src/middlewares/validatoin.sales');
const productsModel = require('../../../src/models/product.model');

describe('Sales Validation Middleware', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should return an error if productId is missing', async function () {
    const req = {
      body: [{ quantity: 10 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await validateSaleItems(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    expect(next.called).to.be.equal(false);
  });

  it('should return an error if product does not exist', async function () {
    const req = {
      body: [{ productId: 999, quantity: 1 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'getById').resolves(null);

    await validateSaleItems(req, res, next);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    expect(next.called).to.be.equal(false);
  });
});
