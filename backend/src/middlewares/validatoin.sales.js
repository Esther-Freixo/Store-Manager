const { productsModel } = require('../models');

const validateSaleItem = async (item) => {
  if (!item.productId) {
    return { error: true, message: '"productId" is required', statusCode: 400 };
  }
  if (typeof item.quantity === 'undefined') {
    return { error: true, message: '"quantity" is required', statusCode: 400 };
  }
  if (item.quantity <= 0) {
    return { error: true, 
      message: '"quantity" must be greater than or equal to 1',
      statusCode: 422 };
  }
  
  const product = await productsModel.getById(item.productId);
  if (!product) {
    return { error: true, message: 'Product not found', statusCode: 404 };
  }
  
  return { error: false };
};

const validateSaleItems = async (req, res, next) => {
  const saleItems = req.body;
  if (!Array.isArray(saleItems)) {
    return res.status(400).json({ message: 'Invalid sale data provided' });
  }

  const validations = await Promise.all(
    saleItems.map((item) => validateSaleItem(item)),
  );
  
  const foundError = validations.find((v) => v.error);
  if (foundError) {
    return res.status(foundError.statusCode).json({ message: foundError.message });
  }
  
  next();
};

module.exports = {
  validateSaleItems,
};
