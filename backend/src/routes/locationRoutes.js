const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/list', locationController.getAllLocations);

router.get('/list/:id', locationController.getLocationById);

router.post('/add', locationController.addLocation);

router.put('/update/:id', locationController.updateLocationById);

router.delete('/delete/:id', locationController.deleteLocationById);

module.exports = router;