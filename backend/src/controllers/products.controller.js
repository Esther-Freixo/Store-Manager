const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async(req,res) => {
    const { id } = req.params;
    const { status, data } = await productsService.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
} 

module.exports = {
  findAll,
  findById
};
