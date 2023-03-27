const express = require('express');
const { saleController } = require('../controllers');
const { validateproductId, validateQuantity } = require('../middlewares/validateNewSale');

const router = express.Router();

router.get('/', saleController.saleList);
router.get('/:id', saleController.getSale);
router.post('/', validateproductId, validateQuantity, saleController.createSale);

module.exports = router;