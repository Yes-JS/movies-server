const express = require('express');
const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/', cartController.getCart);

router.post('/add-product', cartController.addToCart);

router.post('/delete-product', cartController.deleteFromCart);

router.post('/decrease-quantity', cartController.decreaseCartItemQuantity);

exports.routes = router;
