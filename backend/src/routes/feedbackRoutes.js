const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js');

router.get('/list', feedbackController.getAllFeedbacks);

router.post('/add', feedbackController.addFeedback);

module.exports = router;