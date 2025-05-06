const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController.js');

const { authorizeRole } = require('../middlewares/auth.js');

router.get('/list', authorizeRole(['admin']), rentalController.getAllRentals);

router.get('/list/:id', authorizeRole(['admin','customer']), rentalController.getRentalById);

router.post('/add', authorizeRole(['customer']), rentalController.addRental);

router.put('/update/:id',authorizeRole(['customer']), rentalController.updateRentalById);

module.exports = router;