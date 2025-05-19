const express = require('express');

const router = express.Router();

const carController = require('../controllers/carController.js');

router.get('/list', carController.getAllCars);

router.get('/list/:id', carController.getCarById);

router.patch('/status/update/:id', carController.updateRentalstatus)

module.exports = router;