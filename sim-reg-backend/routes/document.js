const express = require('express');
const router = express.Router();
const multer = require('multer');
const { deleteUserRequest } = require('../controllers/userController');
const upload = multer();
const { uploadFile } = require('../controllers/uploadController');

router.post('/request', upload.fields([{ name: 'ktp' }, {name: 'kk' }]), uploadFile);
router.delete('/request/:id', deleteUserRequest);

module.exports = router;
