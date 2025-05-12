const express = require('express');
const router = express.Router();

const discountController = require('../controllers/discountController.js');

router.get('/list', discountController.getAllDiscounts);

router.get('/list/:id', discountController.getDiscountById);

router.post('/add', discountController.addDiscount);

router.put('/update/:id', discountController.updateDiscountById);

router.delete('/delete/:id', discountController.deleteDiscountById);


module.exports = router;
