const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController.js');

router.post('/add', rentalController.addRental);

router.get('/user/:id', rentalController.getRentalsByUser);

module.exports = router;