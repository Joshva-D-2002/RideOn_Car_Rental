const express = require('express');

const router = express.Router();

const carController = require('../controllers/carController.js');

router.get('/list', carController.getAllCars);

router.get('/list/:id', carController.getCarById);

router.post('/add', carController.addCar);

router.put('/update/:id', carController.updateCarById);

router.delete('/delete/:id', carController.deleteCarById);

router.post('/car/:id/features/add', carController.addFeaturesToCar);

router.delete('/car/:id/features/delete', carController.removeFeaturesFromCar);

router.get('/car/:id/images', carController.getCarImagesById);

router.post('/car/:id/image/upload', carController.uploadCarImage);

router.delete('/car/:id/image/:imgurl', carController.deleteCarImage);


module.exports = router;