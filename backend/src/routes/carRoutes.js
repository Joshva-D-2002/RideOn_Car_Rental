const express = require('express');

const router = express.Router();

const carController = require('../controllers/carController');
const { authorizeRole } = require('../middlewares/auth');

router.get('/list', authorizeRole(['admin', 'customer']), carController.getAllCars);

router.get('/list/:id', authorizeRole(['admin', 'customer']), carController.getCarById);

router.post('/add', authorizeRole(['admin']), carController.addCar);

router.put('/update/:id', authorizeRole(['admin']), carController.updateCarById);

router.delete('/delete/:id', authorizeRole(['admin']), carController.deleteCarById);

router.post('/car/:id/features/add', authorizeRole(['admin']), carController.addFeaturesToCar);

router.delete('/car/:id/features/delete', authorizeRole(['admin']), carController.removeFeaturesFromCar);

router.get('/car/:id/images', authorizeRole(['admin', 'customer']), carController.getCarImagesById);

router.post('/car/:id/image/upload', authorizeRole(['admin']), carController.uploadCarImage);

router.delete('/car/:id/image/:imgurl', authorizeRole(['admin']), carController.deleteCarImage);


module.exports = router;