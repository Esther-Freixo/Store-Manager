const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.getAll();
  return {
    status: 'SUCCESSFUL',
    data: sales,
  };
};

const findById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (!sale) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data: sale,
  };
};

module.exports = {
  findAll,
  findById,
};