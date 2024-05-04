const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const newSaleInfo = req.body;
  if (!newSaleInfo) {
    return { status: 'INVALID_VALUE', data: { error: 'Invalid sale information' } };
  }
  const { status, data } = await salesService.createSale(newSaleInfo);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createSale,
};