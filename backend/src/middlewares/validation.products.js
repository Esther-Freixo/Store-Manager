const { productsModel } = require("../models");

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const valideIdExist = async (req, res, next) => {
  const { id } = req.params;
  const findById = await productsModel.getById(id);
  if(!findById) {
    return {
      status: NOT_FOUND,
      data: { "message": "Product not found" }
    }
  }
  next()
} 


module.exports = {
  validateName,
  valideIdExist
};