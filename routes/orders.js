const express = require('express');
const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/', ordersController.getOrder);

router.post('/', ordersController.createOrder);

exports.routes = router;
