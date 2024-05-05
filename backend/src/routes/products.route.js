const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validation.products');

route.get('/', productsController.findAll);

route.get('/:id', productsController.findById);

route.post('/', validateName, productsController.createProduct);

route.put('/:id', validateName, productsController.updateProduct);

module.exports = route;