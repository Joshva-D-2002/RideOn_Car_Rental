const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController.js');

router.get('/list', featureController.getAllFeatures);

router.post('/add', featureController.addFeature);

router.put('/update/:id', featureController.updateFeatureById);

router.delete('/delete/:id', featureController.deleteFeatureById);

module.exports = router;


