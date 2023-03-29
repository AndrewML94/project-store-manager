const express = require('express');
const { saleController } = require('../controllers');
const { validateproductId, validateQuantity } = require('../middlewares/validateNewSale');

const router = express.Router();

router.get('/', saleController.saleList);
router.get('/:id', saleController.getSale);
router.put('/:id', validateproductId, validateQuantity, saleController.updateSale);
router.post('/', validateproductId, validateQuantity, saleController.createSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;