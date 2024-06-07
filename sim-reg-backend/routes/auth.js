const express = require('express');
const router = express.Router();
const { createUserController, loginUserController } = require('../controllers/userController');

router.post('/register', createUserController);
router.post('/login', loginUserController);

module.exports = router;
