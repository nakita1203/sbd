const express = require('express');
const router = express.Router();
const { createNewRequest, deleteUserRequest } = require('../controllers/userController');

router.post('/requests', createNewRequest);
router.delete('/request/:id', deleteUserRequest);

module.exports = router;
