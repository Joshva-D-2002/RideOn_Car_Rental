const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

const { authorizeRole } = require('../middlewares/auth');

router.get('/list', authorizeRole(['admin']), rentalController.getAllRentals);

router.get('/list/:id', authorizeRole(['admin']), rentalController.getRentalById);

router.post('/add', authorizeRole(['customer']), rentalController.addRental);

router.put('/update/:id',authorizeRole(['customer']), rentalController.updateRentalById);

module.exports = router;