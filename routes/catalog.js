const express = require('express');
const catalogController = require('../controllers/catalog');

const router = express.Router();

router.post('/product', 	catalogController.createProduct);

router.post('/edit-product', catalogController.editProduct);

router.post('/delete-product', catalogController.deleteProduct);

router.get('/product', catalogController.getAllProducts);

router.get('/product/:productId', catalogController.getProductById);

exports.routes = router;
