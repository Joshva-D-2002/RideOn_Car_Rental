const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController.js');


router.get('/list', rentalController.getAllRentals);

router.get('/list/:id', rentalController.getRentalById);

router.post('/add', rentalController.addRental);

router.put('/update/:id', rentalController.updateRentalById);

module.exports = router;