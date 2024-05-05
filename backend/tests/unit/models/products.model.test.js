const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { products, newProduct, newProductName } = require('../mocks/products.mock');

describe('Products MODEL:', function () {
  it('Recuperando todos os products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    
    const productsResponse = await productsModel.getAll();

    expect(productsResponse).to.be.an('array'); 
    expect(productsResponse).to.be.deep.equal(products);
  });

  it('Recuperando um produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
    
    const product = await productsModel.getById(1);

    expect(product).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  it('Verificando se não é possível listar um produto que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    
    const productsResponse = await productsModel.getById(888);

    expect(productsResponse).to.be.equal(null);
  });

  it('Cadastro de novo produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.createProduct(newProductName);

    expect(result).to.deep.equal(newProduct);
  });
  
  it('Faz o uptade de um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const id = 1; 
    const name = 'Teste Update';
    const expectedResult = { id, name };
    
    const result = await productsModel.updateProduct(id, name);
    
    expect(result).to.deep.equal(expectedResult);
  });

  it('Returns null if no product is updated', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const id = 1;
    const name = 'Teste Update';
    
    const result = await productsModel.updateProduct(id, name);
    
    expect(result).to.be.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});