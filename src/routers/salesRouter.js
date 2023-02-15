const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.createSale);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;