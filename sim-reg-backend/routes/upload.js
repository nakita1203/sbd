const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer();
const { uploadFile } = require('../controllers/uploadController');

router.post('/upload-document', upload.fields([{ name: 'ktp' }, {name: 'kk' }]), uploadFile);

module.exports = router;