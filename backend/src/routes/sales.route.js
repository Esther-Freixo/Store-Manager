const route = require('express').Router();

const { salesController } = require('../controllers');
const { validateSaleItems } = require('../middlewares/validatoin.sales');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSaleItems, salesController.createSale);

module.exports = route;