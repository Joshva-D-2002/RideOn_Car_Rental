const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js');
const { authorizeRole } = require('../middlewares/auth.js');

router.get('/list', authorizeRole(['admin']), feedbackController.getAllFeedbacks);

router.post('/add', authorizeRole(['customer']), feedbackController.addFeedback);

module.exports = router;