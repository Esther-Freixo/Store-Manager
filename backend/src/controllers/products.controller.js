const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
}; 

const createProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return { status: 'INVALID_VALUE', data: { error: 'Invalid product name' } };
  }
  const { status, data } = await productsService.createProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { status, data } = await productsService.updateProduct(id, name);
    
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};
