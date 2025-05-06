const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authorizeRole } = require('../middlewares/auth');

router.get('/list', authorizeRole(['admin']), feedbackController.getAllFeedbacks);

router.post('/add', authorizeRole(['customer']), feedbackController.addFeedback);

module.exports = router;