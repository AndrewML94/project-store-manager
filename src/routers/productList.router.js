const express = require('express');
const { productController } = require('../controllers');
const validateNameNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/', productController.productList);
router.get('/:id', productController.getProduct);
router.put('/:id', validateNameNewProduct, productController.updateProduct);
router.post('/', validateNameNewProduct, productController.createProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;