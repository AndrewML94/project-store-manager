const express = require('express');
const { productController, saleController } = require('../controllers');
const validateNameNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/', productController.productList);
router.get('/:id', productController.getProduct);
router.post('/', validateNameNewProduct, productController.createProduct);
router.post('/sales', saleController.createSale);

module.exports = router;