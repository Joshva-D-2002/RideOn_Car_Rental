const express = require('express');
const router = express.Router();

const discountController = require('../controllers/discountController');
const { authorizeRole } = require('../middlewares/auth');

router.get('/list', authorizeRole(['admin', 'customer']), discountController.getAllDiscounts);

router.get('/list/:id', authorizeRole(['admin', 'customer']), discountController.getDiscountById);

router.post('/add', authorizeRole(['admin']), discountController.addDiscount);

router.put('/update/:id', authorizeRole(['admin']), discountController.updateDiscountById);

router.delete('/delete/:id', authorizeRole(['admin']), discountController.deleteDiscountById);


module.exports = router;
