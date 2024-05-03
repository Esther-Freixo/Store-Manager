const productModel = require('../models/product.model');

const findAll = async () => {
  const products = await productModel.getAll();
  return {
    status: 'SUCCESSFUL',
    data: products,
  };
};

const findById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data: product,
  };
};

const createProduct = async (name) => {
  const product = await productModel.createProduct(name);
  if (!product) {
    return {
      status: 'INVALID_VALUE',
      data: { message: 'Product not subscribed' },
    };
  }
  return {
    status: 'CREATED',
    data: product,
  };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
