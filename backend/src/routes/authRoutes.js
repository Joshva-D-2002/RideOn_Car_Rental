const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController.js');

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/admin/login', authController.loginAdminUser);

module.exports = router;