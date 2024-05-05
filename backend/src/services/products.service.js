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

const updateProduct = async (id, name) => {
  const uptProduct = await productModel.updateProduct(id, name);
  if (uptProduct === null) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data: uptProduct,
  };
};

const deleteProduct = async (id) => {
  const delProduct = await productModel.deleteProduct(id);
  return delProduct.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
