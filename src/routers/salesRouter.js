const express = require('express');
const { salesController } = require('../controllers');
const validateSaleArray = require('../middlewares/validateSaleArray');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.createSale);
router.put('/:id', validateSaleArray, salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;