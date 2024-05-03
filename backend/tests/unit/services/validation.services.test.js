const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const { validateName } = require('../../../src/services/validations/validation.products');

describe('Middleware - validateName', function () {
  let req; let res; let 
    next;

  beforeEach(function () {
    req = {
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it('should return 400 if name is missing', function () {
    validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('should return 422 if name is less than 5 characters', function () {
    req.body.name = 'abc';
    validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('should call next() if name is valid', function () {
    req.body.name = 'Valid Name';
    validateName(req, res, next);
  });
});
