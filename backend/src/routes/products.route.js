const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateName } = require('../services/validations/validation.products');

route.get('/', productsController.findAll);

route.get('/:id', productsController.findById);

route.post('/', validateName, productsController.createProduct);

module.exports = route;