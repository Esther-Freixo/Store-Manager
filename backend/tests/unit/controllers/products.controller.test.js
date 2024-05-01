const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsModelMock } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers')
const { expect } = chai;
chai.use(sinonChai);


describe('Products CONTROLLERS:', function () {
    afterEach(function () {
        sinon.restore(); 
    });

    it('Verifica o retorno SUCCESSFUL da função findAll', async function() {
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub() 
        }

        sinon.stub(productsService, 'findAll').resolves({
            status: 'SUCCESSFUL',
            data: productsModelMock,
        });

        await productsController.findAll(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsModelMock);
    });

    it('Verifica o retorno SUCCESSFUL da função findById', async function() {
        const req = {
            params: {
              id: 1,
            },
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub() 
        }

        sinon.stub(productsService, 'findById').resolves({
            status: 'SUCCESSFUL',
            data: productIdFromModel,
        });

        await productsController.findAll(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productIdFromModel);
    });

    it('Verifica o retorno NOT_FOUND da função findById', async function() {
        const req = {
            params: {
              id: 888,
            },
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub() 
        }

        sinon.stub(productsService, 'findById').resolves({
            status: 'NOT_FOUND',
            data: { message: 'Product not found' } ,
        });

        await productsController.findAll(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

});