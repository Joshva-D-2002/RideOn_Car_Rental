const express = require('express');
const userontroller = require('../controllers/userController');
const router = express.Router();

router.get('/list/:id', userontroller.getUserById);

module.exports = router;