const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productId = {
  id: 1,
  name: 'Martelo de Thor',
};

const productIdFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const newProductName = 'ProdutoX';

const newProduct = {
  id: 4,
  name: 'ProdutoX',
};

const reqUpdate = {
  "name": "Martelo do Batman"
};

const resUptade = {
  "id": 1,
  "name": "Martelo do Batman"
};

module.exports = {
  products,
  productId,
  productIdFromModel,
  newProduct,
  newProductName,
  reqUpdate,
  resUptade,
};